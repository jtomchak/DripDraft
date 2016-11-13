var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt')

var UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },

  //Everyone is a default user for now
  role: {
    type: String,
    enum: ['user',  'admin'],
    default: 'user'
  },

  // dont store the password as plain text
  password: {
    type: String,
    required: true
  },
},

  //Add additional timestamps
  {timestamps: true}
);

// middleware that will run before a document
// is create
UserSchema.pre('save', function(next){
  if(!this.isModified('password')) return next();
  this.password = this.encryptPassword(this.password);
  next();
});

UserSchema.methods = {
  // check the passwords on signin
  // this.password is the saved HASH in the db
  //TODO: compareSync needs to happen async
  authenticate: function(plainTextPword) {
    return bcrypt.compareSync(plainTextPword, this.password);
  },
  // hash the passwords
  encryptPassword: function(plainTextPword) {
    if (!plainTextPword) {
      return ''
    } else {
      var salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(plainTextPword, salt);
    }
  },
  //return user object minus the password
  toJson: function() {
    var obj = this.toObject()
    delete obj.password;
    return obj;
  }
};

module.exports = mongoose.model('user', UserSchema)