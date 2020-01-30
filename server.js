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

// app.post('/jewelry/save', (req, res) => {
//   let newJewelry  = new Jewelry({

//       jewelry_type: req.body.jewelry_type,
//       jewelry_price: req.body.jewelry_price,
//       jewelry_img_data: req.body.,
//       jewelry_material: req.body.jewelry_material,
//       jewelry_inStock: req.body.jewelry_inStock,
//       // for ring or bracelet or necklece
//       jewelry_size: req.body.jewelry_size,
//       jewelry_note: req.body.jewelry_note
//   })
//   let newJewelry = new Jewelry(data);
//   console.log('NewJewelry: ' + newJewelry);
//   console.log(req.body);
//   newJewelry.save(err => {
//     if (err) {
//       res.status(400).json({ msg: 'Sorry, smth went wrong' });
//       return;
//     }
//     return res.json({ msg: 'data has been added' });
//   });
// });

app.use('/jewelry', jewelryRoutes);

app.listen(PORT, () => {
  console.log(`Server is started at ${PORT} port`);
});
