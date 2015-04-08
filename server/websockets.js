var ws = require('ws');



var Docker=require('dockerode');
var docker=new Docker();
var stream = require('stream');
var dockerTracker = require('docker-tracker')(docker);

function forwardDockerEvents(ws) {
  ['create', 'start', 'stop', 'destroy'].forEach(function(event){
    var listener = function(id) {
      ws.send(JSON.stringify({type: event, id: id}));
    };
    dockerTracker.on(event, listener);
    ws.on('close', function() {
      dockerTracker.removeListener(event, listener);
    });
  });
}


function forwardTerminalData(containerId, ws) {

  var container = docker.getContainer(containerId);
  var options = {
    "AttachStdin": true,
    "AttachStdout": true,
    "AttachStderr": true,
    "Tty": true,
    Cmd: ['bash']
  };
  container.exec(options, function(err, exec) {
    if (err) {
      throw err;
    }
    exec.start({stdin: true},function(err, execStream) {
      if (err) {
        throw err;
      }

      var output = new stream.PassThrough();


      container.modem.demuxStream(execStream, output, output);

      output.on('data', function(chunk) {
        ws.send(chunk.toString());
      });

      ws.on('message', function(msg) {
        execStream.write(msg);
      });

    });
  });
}


module.exports.connect = function(server) {
  var wss = new ws.Server({server: server});
  wss.on('connection', function(ws) {

    var path = ws.upgradeReq.url.substr(1).split('/');

    if (path.length == 2 && path[0] == 'containerSocket') {
      forwardTerminalData(path[1], ws);
    } else if (path[0] == 'dockerEvents') {
      forwardDockerEvents(ws);
    } else {
      ws.close();
    }

  });
};