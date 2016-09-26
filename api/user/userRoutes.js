var User = require('./userModel'); // get our mongoose model
var userRouter = require('express').Router();

var users = [];
/* GET users listing. */
userRouter.get('/', function(req, res, next) {
  res.json(users);
});

module.exports = userRouter;
