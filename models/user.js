const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

mongoose.promise = Promise;

//define userSchema
const userSchema = new Schema({
  username: {
    type: String,
    unique: false,
    required: true
  },
  email: {
    type: String,
    unique: false,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    unique: false,
    required: true
  },
  basket: {
    type: Array
  }
});

//define schema methods
userSchema.methods = {
  checkPassword: function(inputPassword) {
    // return inputPassword === this.password;
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10);
  }
};

//define hooks for pre-saving

userSchema.pre('save', function(next) {
  let User = this;
  if (!this.password) {
    console.log('models/user.js ===== no password provided');
    next();
  } else {
    console.log('/models/user.js WITHOUT  hashPassword in pre save');
    if (!User.isModified('password')) return next();
    this.password = this.hashPassword(this.password);
    next();
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
