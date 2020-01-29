const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.listen(PORT, () => {
  console.log(`Server is started at ${PORT} port`);
});
