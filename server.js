const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const PORT = process.env.PORT || 9000;

mongoose.Promise = global.Promise; //???

const app = express();

let Jewelry = require('./models/jewelry');
const jewelryRoutes = require('./routes/jewelry');
const User = require('./models/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('tiny'));
// db config
const MONGODB_URI =
  'mongodb+srv://kdord:kdordShopPass@cluster0-jskl6.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Mongo DB is connected!');
});

app.post('/signup', (req, res) => {
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

app.use('/jewelry', jewelryRoutes);

app.listen(PORT, () => {
  console.log(`Server is started at ${PORT} port`);
});
