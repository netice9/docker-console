'use strict';

var _ = require('lodash');

// Get list of terminals
exports.index = function(req, res) {
  res.json([]);
};


exports.terminal = function(req, res) {
  //
  res.render('terminal', { containerId: req.params.containerId});
}