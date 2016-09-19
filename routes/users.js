var express = require('express');
var User = require('../models/user'); // get our mongoose model
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
