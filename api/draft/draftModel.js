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
  
  //Each draft belongs to 1 topic
  topic: {
    type: Schema.Types.ObjectId, 
    require: true,
    ref: 'topic', 
  },

  //Each draft belongs to 1 user. 
  author: {type: Schema.Types.ObjectId, ref: 'user'},

  //Each draft can have many categories
  categories: [{type: Schema.Types.ObjectId, ref: 'category'}]
},

 //Add additional timestamps
  {timestamps: true}
);

DraftSchema.pre('save', function(next){
  next();
});

DraftSchema.methods = {

   //return draft object minus the auther, topic
   //since get draft is by topic id.
  toJson: function() {
    var obj = this.toObject()
    delete obj.author;
    // delete obj.topic;
    return obj;
  }
};

module.exports = mongoose.model('draft', DraftSchema) 
