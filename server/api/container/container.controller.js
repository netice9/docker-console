'use strict';

var _ = require('lodash');

var docker = require('../../docker');

// Get list of containers
exports.index = function(req, res) {

  res.json(docker.containers);
};