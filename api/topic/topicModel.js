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
    default: 0
  },

  totalDraftCount: {
    type: Number
  },

  lastDraftAt: {
    type: Date, 
    default: Date.now 
  },

  drafts : [{ type: Schema.Types.ObjectId, ref: 'draft' }]
},
   //Add additional timestamps
  {timestamps: true}
);

TopicSchema.pre('validate', function (next) {
  this.streak = updateDraftStreakForTopic(this.lastDraftAt) ? this.streak + 1 : 1;
  this.totalDraftCount = this.drafts.length;
  next();
});


TopicSchema.methods = {
  //return topics object minus the user
  toJson: function() {
    var obj = this.toObject()
    delete obj.user;
    delete obj.drafts;
    return obj;
  }, 
  //update drafts array for topic
  pushNewDraft: function(draft) {
    this.drafts.push(draft._id);
    this.save();
    return this;
  }
};

//Return bool based on weather the draft to be saved extends the streak
//It must be the following calandar day, before midnight.
function updateDraftStreakForTopic(lastDraftDate){
  const currentDate = new Date();
  var streakDeadlineDate = new Date(lastDraftDate);
  streakDeadlineDate.setDate(streakDeadlineDate.getDate() + 1)
  streakDeadlineDate.setHours(23, 59, 59); //set deadline to 11:59pm
//Draft needs to be after the day has passed, but before the end of the following day.
  return (lastDraftDate < streakDeadlineDate && lastDraftDate.getDate() > currentDate.getDate());
}

module.exports = mongoose.model('topic', TopicSchema);
