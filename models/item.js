const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    requried: true,
  },
  category: {
    type: String,
    required: true,
  },
});

// collection name is mentioned at the end
module.exports = mongoose.model('Item', itemSchema, 'items');
