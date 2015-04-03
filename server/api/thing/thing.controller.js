/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');

var docker = require('../../docker');

// Get list of things
exports.index = function(req, res) {

  var containers = Object.keys(docker.containers).map(function(containerId) {
    return {name: containerId, info: 'whatever'}
  });

  res.json(containers);
};