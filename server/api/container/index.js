'use strict';

var express = require('express');
var controller = require('./container.controller');

var router = express.Router();

router.get('/', controller.index);
router.delete('/:id', controller.destroy);

module.exports = router;