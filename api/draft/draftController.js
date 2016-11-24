var Draft = require('./draftModel');
var _ = require('lodash');

exports.params = function(req, res, next, id) {
  Draft.findById(id)
    .populate('author categories')
    .exec()
    .then(function(draft) {
      if (!draft) {
        next(new Error('No draft with that id'));
      } else {
        req.draft = draft;
        next();
      }
    }, function(err) {
      next(err);
    });
};

//Getting Drafts by current logged in User Only. 
exports.get = function(req, res, next) {
  Draft.find({author: req.user._id})
    .populate({
      path: 'categories',
    })
    .exec()
    .then(function(drafts){
      res.json(drafts);
    }, function(err){
      next(err);
    });
};

exports.getOne = function(req, res, next) {
  var draft = req.draft;
  res.json(draft);
};

exports.put = function(req, res, next) {
  var draft = req.draft;

  var update = req.body;

  _.merge(draft, update);

  draft.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.post = function(req, res, next) {
  var newDraft = req.body;
  //Add author by autherized user token
  //Verify 140 word limit
  newDraft.author = req.user._id;
  if (countWords(newDraft.text) > 140) {
    res.status(403).json({
        message: 'Draft is over the word limit of 140'
    });
  }
  Draft.create(newDraft)
    .then(function(draft) {
      res.json(draft);
    }, function(err) {
      next(err);
    });
};

exports.delete = function(req, res, next) {
  req.draft.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(draft);
    }
  });
};

//Return word count for draft posts
function countWords(s){
    s = s.replace(/(^\s*)|(\s*$)/gi,"");//exclude  start and end white-space
    s = s.replace(/[ ]{2,}/gi," ");//2 or more space to 1
    s = s.replace(/\n /,"\n"); // exclude newline with a start spacing
    return s.split(' ').length; 
}
