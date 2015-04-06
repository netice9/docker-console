'use strict';

var express = require('express');
var controller = require('./terminal.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:containerId', controller.terminal);

module.exports = router;