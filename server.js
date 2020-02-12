const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('./passport');
const path = require('path');

require('dotenv').config();

const PORT = process.env.PORT || 9000;

mongoose.Promise = global.Promise; //???

const app = express();

//routes requires
const jewelryRoutes = require('./routes/jewelry');
const userRoutes = require('./routes/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));
// db config
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Mongo DB is connected!');
});

mongoose.set('useFindAndModify', false);
//sessions
app.use(
  session({ secret: 'argentum', resave: false, saveUninitialized: false })
);
//passport
app.use(passport.initialize());
app.use(passport.session()); // calls the deserializeUser

app.use('/user', userRoutes);
app.use('/jewelry', jewelryRoutes);

// For production = Build

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is started at ${PORT} port`);
});
