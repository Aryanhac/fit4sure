const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city:{
    type: String, 
    required: true
  },
  gender:{
    type: String,
    required: true
  },
  paymentHistory: [
    {
      price: {
        type: Number,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      status:{
        type: String,
        required: true
      },
      merchantTransactionId:{
        type: String,
        required: true
      },
      acceptPolicy:{
        type: String,
        required: true
      },
      hearPlace: {
        type: String,
        required: true
      },
      createdAt: {
        type: String,
        default: Date.now
      }
    }
  ],
  trainer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Trainer'
  },
  createdAt: {
    type: String,
    default: Date.now
  }
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
