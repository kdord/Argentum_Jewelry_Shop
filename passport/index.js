const passport = require('passport');
const LocalStrategy = require('./localStrategy');
const User = require('../models/user');

//called on login, saves the id session req.session.passport.user = {id:".."}
passport.serializeUser((user, done) => {
  console.log('**** serializeUser called, user: ');
  console.log(user);
  console.log('------');
  done(null, { _id: user._id });
});

//user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
  console.log('deserializeUser called');
  User.findOne({ _id: id }, (err, user) => {
    console.log('*** Deserialize User, user: ');
    console.log(user);
    console.log('------');
    done(null, user);
  });
});

passport.use(LocalStrategy);

module.exports = passport;
