var User = require('../api/user/userModel');
var signToken = require('./auth').signToken;

exports.signin = function(req, res, next) {
  // req.user will be there from the middleware
  // verify user. Then we can just create a token
  // and send it back for the client to consume
var user = req.user.toJson();
user.accessToken = signToken(req.user._id);
res.json(user);
}

exports.signup = function(req, res, next) {
  //TODO: validation needed? 
  var newUser = req.body;

  User.create(newUser)
    .then(function(user) {
      console.log(user);
      var user = user.toJson();
      user.accessToken = signToken(user._id);
      res.json(user);
    }, function(err) {
      next(err);
    });
}