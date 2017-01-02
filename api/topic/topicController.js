var Topic = require('./topicModel');
var _ = require('lodash');

exports.params = function (req, res, next, id) {
  Topic.findById(id)
    .exec()
    .then(function (topic) {
      if (!topic) {
        next(new Error('No topic with that id'));
      } else {
        req.topic = topic;
        next();
      }
    }, function (err) {
      next(err);
    });
};

//Getting Topics by current logged in User Only. 
exports.get = function (req, res, next) {
  Topic.find({ user: req.user._id })
    .exec()
    .then(function (topics) {
      //apply toJson to each topic obj before returning
      var jsonTopics = topics.map(function (topic) {
        return topic.toJson();
      });
      res.json(jsonTopics);
    }, function (err) {
      next(err);
    });
};

exports.getOne = function (req, res, next) {
  var topic = req.topic;
  res.json(topic);
};

exports.put = function (req, res, next) {
  var topic = req.topic;

  var update = req.body;

  _.merge(topic, update);

  topic.save(function (err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.post = function (req, res, next) {
  var newTopic = req.body;
  newTopic.user = req.user._id;
  //Add Default values for new Topic. Streak, total drafts
  //Check for existing Topic trim string, make topic text unique
  Topic.create(newTopic)
    .then(function (topic) {
      res.json(topic.toJson());
    }, function (err) {
      next(err);
    });
};

exports.delete = function (req, res, next) {
  req.topic.remove(function (err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(topic);
    }
  });
};

exports.verifyTopic = function() {
  return function(req, res, next) {
    //Here we always lowercase the email.
    var topicId = req.query.topic_id;

    // if no email or password then stop.
    if(!topicId){
        res.status(400).send('You need to include a topic id');
        return;
    }
   // look topic up in the DB so we can check
    Topic.findById(topicId)
        .then(function (topic) {
            if (!topic) {
                res.status(401).send('No topic with that id exists');
            } else {
                    // if everything is good,
                    // then attach to req.topic
                    // and call next so the controller
                    req.topic = topic;
                    next();
            }
        }, function (err) {
            next(err);
        });
  };
};