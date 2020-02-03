const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.promise = Promise;

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

const User = mongoose.model('User', userSchema);
module.exports = User;
