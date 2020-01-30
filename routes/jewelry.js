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

router.post('/update/:id', (req, res) => {
  Jewelry.findById(req.params.id)
    .then(jewelry => {
      jewelry.jewelry_type = req.body.jewelry_type;
      jewelry.jewelry_price = req.body.jewelry_price;
      jewelry.jewelry_material = req.body.jewelry_material;
      jewelry.jewelry_inStock = req.body.jewelry_inStock;
      jewelry.jewelry_img_title = req.body.jewelry_img_title;
      jewelry.jewelry_img_desc1 = req.body.jewelry_img_desc1;
      jewelry.jewelry_img_desc2 = req.body.jewelry_img_desc2;
      jewelry.jewelry_size = req.body.jewelry_size;
      jewelry.jewelry_note = req.body.jewelry_note;

      jewelry
        .save()
        .then(() => res, json('jewelry updated'))
        .catch(err => {
          res.status(400).json('Error: ' + err);
        });
    })
    .catch(err => {
      res.status(400).json('Error: ' + err);
    });
});

router.delete('/:id', (req, res) => {
  Jewelry.findByIdAndDelete(req.params.id)
    .then(() => res.json('Jewelry removed'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
