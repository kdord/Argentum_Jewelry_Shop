const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.post('/signup', (req, res) => {
  console.log('user signup');

  const { email, username, password } = req.body;
  // add validation
  User.findOne({ username: username }, (err, userMatch) => {
    // if (err) {
    //   console.log('no matches');
    // }
    if (userMatch) {
      return res.json({
        error: `Sorry, already a user with the username ${username}`
      });
    }
    const newUser = new User({
      email: email,
      username: username,
      password: password
    });
    newUser.save((err, savedUser) => {
      console.log('in .save');
      console.log(newUser);
      if (err) return res.json(err);
      return res.json(savedUser);
    });
  });
});

module.exports = router;
