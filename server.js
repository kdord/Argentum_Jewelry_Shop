const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 9000;

const app = express();

let Jewelry = require('./models/jewelry');
const jewelryRoutes = require('./routes/jewelry');

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

// let startedJewelryData = new Jewelry({
//   jewelry_type: 'Ring',
//   jewelry_price: 150,
//   jewelry_material: 'Silver 925',
//   jewelry_inStock: true,
//   jewelry_size: 16
// });
// startedJewelryData.save(err => {
//   if (err) {
//     console.log('Error: ' + err);
//   } else {
//     console.log('Jewelry added');
//   }
// });

// app.post('/jewelry/save', (req, res) => {
//   console.log('in /jewelry/save');
//   //   let data = req.body;
//   //   let newJewelry = new Jewelry(data);
//   //   console.log('NewJewelry: ' + newJewelry);
//   //   newJewelry.save(err => {
//   //     if (err) {
//   //       res.status(400).json({ msg: 'Sorry, smth went wrong' });
//   //       return;
//   //     }
//   //     return res.json({ msg: 'data has been added' });
//   //   });
// });

app.use('/jewelry', jewelryRoutes);

app.listen(PORT, () => {
  console.log(`Server is started at ${PORT} port`);
});
