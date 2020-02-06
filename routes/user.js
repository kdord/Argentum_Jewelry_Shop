const express = require('express');
const router = express.Router();

const Jewelry = require('../models/jewelry');
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
    } else {
      User.findOne({ email: email }, (err, foundUser) => {
        if (foundUser) {
          return res.json({
            error: `Sorry, already a user with the email ${email}`
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
    }
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

router.post('/:userId/add/', (req, res) => {
  console.log('in .post /add');
  console.log('req.body:');
  console.log(req.body);
  User.findOne({ _id: req.params.userId }, (err, foundUser) => {
    if (err) {
      console.log('Error: ' + err);
    } else {
      foundUser.basket = foundUser.basket.filter(
        item => item._id !== req.body._id
      );
      const jewelry = req.body;

      foundUser.basket.push(jewelry);
      foundUser.save();
      console.log('after pushing: ');
      console.log(foundUser.basket);
    }
  });
});

router.post('/:userId/delete/:jewelryId', (req, res) => {
  console.log('in .post /delete');

  User.findOne({ _id: req.params.userId }, (err, foundUser) => {
    if (err) {
      console.log('Error: ' + err);
    } else {
      const newBasket = foundUser.basket.filter(
        item => item._id !== req.params.jewelryId
      );
      console.log(newBasket);
      foundUser.basket = newBasket;
      foundUser.save();
    }
  });
});

router.post('/:userId/update/:jewelryId', (req, res) => {
  console.log('in update amount, amount:');
  console.log(req.body.amount);
  const newAmount = req.body.amount;
  User.findOneAndUpdate(
    { _id: req.params.userId, 'basket._id': req.params.jewelryId },
    { $set: { 'basket.$.amount': newAmount } },
    null,
    err => {
      if (err) {
        console.log('Error: ' + err);
      } else {
        console.log('updated');
      }
    }
  );

  // User.findOne({ _id: req.params.userId }, (err, foundUser) => {
  //   if (err) {
  //     console.log('Error: ' + err);
  //   } else {
  //     foundUser.update(
  //       { 'basket._id': req.params.jewelryId },
  //       { $set: { 'basket.$.amount': req.body.amount } }
  //     );

  // const foundItem = foundUser.basket.find(
  //   item => item._id === req.params.jewelryId
  // );
  // const newBasket = foundUser.basket.filter(
  //   item => item._id !== req.params.jewelryId
  // );
  // console.log(foundItem);
  // foundItem.amount = req.body.amount;
  // console.log('found item after changing');
  // console.log(foundItem);
  // newBasket.push(foundItem);
  // console.log(newBasket);
  // foundUser.basket = newBasket;
  // foundUser.save();
  //   }
  // });
});

module.exports = router;
