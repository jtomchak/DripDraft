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

  //Each draft belongs to 1 topic
  topic: {
    type: Schema.Types.ObjectId, 
    ref: 'topic',
    required: true
  },

  //Each draft can have many categories
  categories: [{type: Schema.Types.ObjectId, ref: 'category'}]
},

 //Add additional timestamps
  {timestamps: true}
);

module.exports = mongoose.model('draft', DraftSchema) 
