var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DraftSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  text: {
    type: String,
    required: true
  },

  //Each draft belongs to 1 user. 
  author: {type: Schema.Types.ObjectId, ref: 'user'},

  //Each draft can have many categories
  categories: [{type: Schema.Types.ObjectId, ref: 'category'}]
});

module.exports = mongoose.model('draft', DraftSchema) 
