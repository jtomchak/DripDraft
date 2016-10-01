var userRouter = require('express').Router();
var logger = require('../../util/logger');;
var controller = require('./userController');
var auth = require('../../auth/auth');
var checkUser = [auth.decodeToken(), auth.getFreshUser()];

userRouter.param('id', controller.params);
userRouter.route('/me', checkUser, controller.me);

userRouter.route('/')
  .get(checkUser, controller.get)
  .post(controller.post)

userRouter.route('/:id')
  .get(controller.getOne)
  .put(checkUser, controller.put)
  .delete(checkUser, controller.delete)

module.exports = userRouter;

