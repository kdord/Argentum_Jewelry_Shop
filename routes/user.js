const express = require('express');
const router = express.Router();

const User = require('../models/user');
const passport = require('../passport');

router.post('/signup', (req, res) => {
  console.log('user signup');

  const { email, username, firstName, lastName, password, basket } = req.body;
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
      firstName: firstName,
      lastName: lastName,
      password: password,
      basket: basket
    });
    newUser.save((err, savedUser) => {
      console.log('in .save');
      console.log(newUser);
      if (err) return res.json(err);
      return res.json(savedUser);
    });
  });
});

router.post(
  '/login',
  function(req, res, next) {
    console.log('routes/user.js, login, req.body:');
    console.log(req.body);
    next();
  },
  passport.authenticate('local'),
  (req, res) => {
    console.log('logged in ', req.user);
    let user = req.user;
    res.send(user);
  }
);

router.get('/', (req, res, next) => {
  console.log('==== user===');
  console.log(req.user);
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

router.post('/logout', (req, res) => {
  if (req.user) {
    req.logout();
    res.send({ msg: 'logging out' });
  } else {
    res.send({ msg: 'no user to log out' });
  }
});

module.exports = router;
