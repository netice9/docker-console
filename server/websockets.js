var ws = require('ws');



var Docker=require('dockerode');
var docker=new Docker();
var stream = require('stream');


function forwardTerminalData(containerId, ws) {

  console.log("ws keys: %j", ws.upgradeReq.headers);

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
  wss.on('connection', function(ws, req) {

    var containerId = ws.upgradeReq.url.substr(1);

    forwardTerminalData(containerId, ws);


    // ws.once('message', function(msg) {
    //   var data = JSON.parse(msg);
    //   if (data.type == "open terminal") {
    //   }
    // });
  });
};