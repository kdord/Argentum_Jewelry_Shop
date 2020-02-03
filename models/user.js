const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

mongoose.promise = Promise;

//define userSchema
const userSchema = new Schema({
  email: {
    type: String,
    unique: false,
    required: true
  },
  username: {
    type: String,
    unique: false,
    required: true
  },
  password: {
    type: String,
    unique: false,
    required: true
  }
});

//define schema methods
userSchema.methods = {
  checkPassword: function(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10);
  }
};

//define hooks for pre-saving

userSchema.pre('save', function(next) {
  if (!this.password) {
    console.log('models/user.js ===== no password provided');
    next();
  } else {
    console.log('/models/user.js hashPassword in pre save');
    this.password = this.hashPassword(this.password);
    next();
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
