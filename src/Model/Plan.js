const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  strikePrice: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  button: {
    type: String,
    required: true,
  },
  options: {
    type: [Boolean],
    required: true,
  },
});

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;