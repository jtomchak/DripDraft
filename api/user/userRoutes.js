var userRouter = require('express').Router();
var logger = require('../../util/logger');;
var controller = require('./userController');

userRouter.param('id', controller.params);

userRouter.route('/')
  .get(controller.get)
  .post(controller.post)

userRouter.route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete)

module.exports = userRouter;

