var categoryRouter = require('express').Router();
var logger = require('../../util/logger');
var controller = require('./categoryController');

categoryRouter.param('id', controller.params);

categoryRouter.route('/')
  .get(controller.get)
  .post(controller.post)

categoryRouter.route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete)

module.exports = categoryRouter;
