var Docker = require('dockerode');
var docker = new Docker();

var tracker = require('docker-tracker')(docker);


module.exports = {
  containers: tracker.containers,
  docker: docker
};