const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let JewelrySchema = new Schema({
  jewelry_type: {
    type: String,
    required: true
  },
  jewelry_name: {
    type: String,
    required: true
  },

  jewelry_price: {
    type: Number,
    required: true
  },
  jewelry_img_1: {
    type: String,
    required: true
  },
  jewelry_img_2: {
    type: String,
    required: true
  },
  jewelry_img_3: {
    type: String,
    required: true
  },
  jewelry_material: {
    type: String,
    required: true
  },
  jewelry_inStock: {
    type: Boolean,
    required: true
  },
  // for ring or bracelet or necklace
  jewelry_size: {
    type: String
  },
  jewelry_note: {
    type: String
  }
});

module.exports = mongoose.model('Jewelry', JewelrySchema);
