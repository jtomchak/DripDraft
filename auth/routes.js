var router = require('express').Router();
var controller = require('./controller');
var verifyUser = require('./auth').verifyUser;
var getFreshUser = require('./auth').getFreshUser;
// before we send back a jwt, lets check
// the password and username match what is in the DB
// this will be in by adding in the middleware
router.post('/signin',verifyUser(), getFreshUser(), controller.signin);

module.exports = router;
