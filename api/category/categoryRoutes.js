var categoryRouter = require('express').Router();
var logger = require('../../util/logger');
var controller = require('./categoryController');
var auth = require('../../auth/auth');
var checkUser = [auth.decodeToken(), auth.getFreshUser()];

categoryRouter.param('id', controller.params);

categoryRouter.route('/')
  .get(controller.get) //get all categories
  .post(checkUser, controller.post) //create new categories

categoryRouter.route('/:id')
  .get(controller.getOne)
  .put(checkUser, controller.put)
  .delete(checkUser, controller.delete)

module.exports = categoryRouter;
