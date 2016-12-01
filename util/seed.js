var User = require('../api/user/userModel');
var Draft = require('../api/draft/draftModel');
var Category = require('../api/category/categoryModel');
var Topic = require('../api/topic/topicModel');
var _ = require('lodash');
var logger = require('./logger');

logger.log('Seeding the Database');

var users = [
  {email: 'jimmylo@testing.com', name: "Jimmy", password: 'test'},
  {email: 'xoko@testing.com', name: "Xoko", password: 'test'},
  {email: 'katamon@testing.com', name: "Kate", password: 'test'}
];

var topics = [
  {name: 'default'},
  {name: 'Tech'},
  {name: 'Journel'}
];

var categories = [
  {name: 'intros'},
  {name: 'angular'},
  {name: 'UI/UX'}
];

var drafts = [
  {title: 'Learn angular 2 today', text: 'Angular to is so dope'},
  {title: '10 reasons you should love IE7', text: 'IE7 is so amazing'},
  {title: 'Why we switched to Go', text: 'go is dope'}
];

var createDoc = function(model, doc) {
  return new Promise(function(resolve, reject) {
    new model(doc).save(function(err, saved) {
      return err ? reject(err) : resolve(saved);
    });
  });
};

var cleanDB = function() {
  logger.log('... cleaning the DB');
  var cleanPromises = [User, Category, Draft, Topic]
    .map(function(model) {
      return model.remove().exec();
    });
  return Promise.all(cleanPromises);
}

var createUsers = function(data) {

  var promises = users.map(function(user) {
    return createDoc(User, user);
  });

  return Promise.all(promises)
    .then(function(users) {
      return _.merge({users: users}, data || {});
    });
};

var createCategories = function(data) {
  var promises = categories.map(function(category) {
    return createDoc(Category, category);
  });

  return Promise.all(promises)
    .then(function(categories) {
      return _.merge({categories: categories}, data || {});
    });
};

var createTopics = function(data) {
  var promises = topics.map(function(topic, i) {
    topic.user = data.users[i]._id;
    return createDoc(Topic, topic);
  });

  return Promise.all(promises)
    .then(function(topics) {
      return _.merge({topics: topics}, data || {});
    });
};

var createDrafts = function(data) {
  var addCategory = function(draft, category, topic) {
    draft.categories.push(category);
    return new Promise(function(resolve, reject) {
      draft.save(function(err, saved) {
        return err ? reject(err) : resolve(saved)
      });
    });
  };

  // var newPosts = posts.map(function(post, i) {
  //   post.author = data.users[i]._id;
  //   return createDoc(Post, post);
  // });

  var newDrafts = drafts.map(function(draft, i) {
    draft.author = data.users[i]._id;
    draft.topic = data.topics[i]._id;
    return createDoc(Draft, draft);
  });

  return Promise.all(newDrafts)
    .then(function(savedDrafts) {
      return Promise.all(savedDrafts.map(function(post, i){
        return addCategory(post, data.categories[i])
      }));
    })
    .then(function() {
      return 'Seeded DB with 3 Drafts, 3 Users, 3 Categories, with Topics!';
    });
};

cleanDB()
  .then(createUsers)
  .then(createCategories)
  .then(createTopics)
  .then(createDrafts)
  .then(logger.log.bind(logger))
  .catch(logger.log.bind(logger));
