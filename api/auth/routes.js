var router = require('express').Router();
var controller = require('./controller');

// before we send back a jwt, lets check
// the password and username match what is in the DB
// this will be in by adding in the middleware
router.post('/signin', controller.signin);

module.exports = router;
