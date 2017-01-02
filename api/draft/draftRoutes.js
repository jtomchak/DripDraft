var draftRouter = require('express').Router();
var logger = require('../../util/logger');;
var controller = require('./draftController');
var topicController = require('../topic/topicController');
var auth = require('../../auth/auth');
var checkUser = [auth.decodeToken(), auth.getFreshUser()];
var checkTopic = topicController.verifyTopic();

draftRouter.param('topic', controller.params);

draftRouter.route('/')
  .get(checkUser, checkTopic, controller.get) //get drafts by topic for user
  .post(checkUser, controller.post) //post new draft

draftRouter.route('/:id')
  .get(checkUser, controller.getOne) //get draft post by author
  .put(checkUser, controller.put) //update draft
  .delete(checkUser, controller.delete) //delete draft

module.exports = draftRouter