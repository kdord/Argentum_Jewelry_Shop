const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let JewelrySchema = new Schema({
  jewelry_type: {
    type: String,
    required: true
  },
  jewelry_price: {
    type: Number,
    required: true
  },
  jewelry_img_data: {
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
  // for ring or bracelet or necklece
  jewelry_size: {
    type: String
  },
  jewelry_note: {
    type: String
  }
});

module.exports = mongoose.model('Jewelry', JewelrySchema);
