var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TopicSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
    //Each topic belongs to 1 user. 
  user: {
    type: Schema.Types.ObjectId, 
    ref: 'user',
    required: true
  },

  streak: {
    type: Number,
    require: false,
  }
},
   //Add additional timestamps
  {timestamps: true}
);

TopicSchema.methods = {
  //return topics object minus the user
  toJson: function() {
    var obj = this.toObject()
    delete obj.user;
    return obj;
  } 
};

module.exports = mongoose.model('topic', TopicSchema);
