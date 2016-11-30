var topicRouter = require('express').Router();
var logger = require('../../util/logger');;
var controller = require('./topicController');
var auth = require('../../auth/auth');
var checkUser = [auth.decodeToken(), auth.getFreshUser()];

topicRouter.param('id', controller.params);

topicRouter.route('/')
  .get(checkUser, controller.get) //get ALL topics for user
  .post(checkUser, controller.post) //post new topic

topicRouter.route('/:id')
  .get(checkUser, controller.getOne) //get topic by author
  .put(checkUser, controller.put) //update topic by topic id
  //TODO would this remove all associated drafts? 
  .delete(checkUser, controller.delete) //remove topic, 

module.exports = topicRouter