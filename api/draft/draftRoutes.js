var draftRouter = require('express').Router();
var logger = require('../../util/logger');;
var controller = require('./draftController');

draftRouter.param('id', controller.params);

draftRouter.route('/')
  .get(controller.get)
  .post(controller.post)

draftRouter.route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete)

module.exports = draftRouter