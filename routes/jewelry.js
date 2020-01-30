const express = require('express');
const router = express.Router();

const Jewelry = require('../models/jewelry');

router.get('/', (req, res) => {
  Jewelry.find((err, jewelry) => {
    if (err) {
      console.log('Error: ' + err);
    } else {
      res.json(jewelry);
    }
  });
});

router.get('/:id', (req, res) => {
  Jewelry.findById(req.params.id)
    .then(jewelry => res.json(jewelry))
    .catch(err => {
      res.status(400).json('Error: ' + err);
    });
});

router.post('/save', (req, res) => {
  let data = req.body;
  let newJewelry = new Jewelry(data);
  console.log('NewJewelry: ' + newJewelry);
  newJewelry.save(err => {
    if (err) {
      res.status(400).json({ msg: 'Sorry, smth went wrong' });
      return;
    }
    return res.json({ msg: 'data has been added' });
  });
});

module.exports = router;
