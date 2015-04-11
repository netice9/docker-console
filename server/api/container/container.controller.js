'use strict';

var _ = require('lodash');

var docker = require('../../docker');

// Get list of containers
exports.index = function(req, res) {
  res.json(docker.containers);
};

exports.destroy = function(req, res) {

  // console.log("%j", Object.keys(res));

  var container = docker.docker.getContainer(req.params.id).remove({force: true}, function(err) {
    if (err) {
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  });

};