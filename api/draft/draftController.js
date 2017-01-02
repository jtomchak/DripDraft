var Draft = require('./draftModel');
var Topic = require('../topic/topicModel');
var _ = require('lodash');

exports.params = function (req, res, next, topic) {
  // Draft.findById(id)
  //   .populate('author categories')
  //   .exec()
  //   .then(function(draft) {
  //     if (!draft) {
  //       next(new Error('No draft with that id'));
  //     } else {
  //       req.draft = draft;
  //       next();
  //     }
  //   }, function(err) {
  //     next(err);
  //   });
};

//Getting Drafts by TopicId for current logged in User Only. 
exports.get = function (req, res, next) {
  Draft.find({ topic: req.topic._id })
    .populate(
    'categories', '_id name'
    )
    .populate(
    'topic', '_id name'
    )
    .exec()
    .then(function (drafts) {
      //  var formatedDrafts = drafts.map(function(draft, i){
      //     console.log(draft);
      //     return draft.toJson();
      //   });
      res.json(drafts);
    }, function (err) {
      next(err);
    });
};

exports.getOne = function (req, res, next) {
  var draft = req.draft;
  res.json(draft);
};

exports.put = function (req, res, next) {
  var draft = req.draft;

  var update = req.body;

  _.merge(draft, update);

  draft.save(function (err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.post = function (req, res, next) {
  var newDraft = req.body;
  //Add author by autherized user token
  //Verify 140 word limit
  newDraft.author = req.user._id;
  if (countWords(newDraft.text) > 140) {
    res.status(403).json({
      message: 'Draft is over the word limit of 140'
    });
  }
  //   exports.postComment = function(req,res) {
  //   // XXX: this all assumes that `postId` is a valid id.
  //   var comment = new Comment({
  //     content : req.body.content,
  //     post    : req.params.postId,
  //     user    : req.user._id
  //   });
  //   comment.save(function(err, comment) {
  //     if (err) return res.send(err);
  //     Post.findById(req.params.postId, function(err, post) {
  //       if (err) return res.send(err);
  //       post.commentIds.push(comment);
  //       post.save(function(err) {
  //         if (err) return res.send(err);
  //         res.json({ status : 'done' });
  //       });
  //     });
  //   });
  // };
  Draft.create(newDraft)
    .then(function (draft) {
      // console.log(draft.topic);
      var result = [];
      return Topic.findById(draft.topic).exec()
        .then(function (topic) {
          return [draft, topic];
        });
    })
    .then(function (result) {
      var topic = result[1].pushNewDraft(result[0]);
      // res.json(result[0]);
      res.json(topic.toJson());
    }, function (err) {
      next(err);
    });
};

exports.delete = function (req, res, next) {
  req.draft.remove(function (err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(draft);
    }
  });
};

//Return word count for draft posts
function countWords(s) {
  s = s.replace(/(^\s*)|(\s*$)/gi, "");//exclude  start and end white-space
  s = s.replace(/[ ]{2,}/gi, " ");//2 or more space to 1
  s = s.replace(/\n /, "\n"); // exclude newline with a start spacing
  return s.split(' ').length;
}

var updateTopicWithDraft = function (draft) {
  Topic.findById(draft.topic);
}
var thirdMethod = function (someStuff) {
  var promise = new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log('third method completed');
      resolve({ result: someStuff.newData });
    }, 3000);
  });
  return promise;
};
