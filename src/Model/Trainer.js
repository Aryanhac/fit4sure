const mongoose = require('mongoose');

const TrainerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    yoe: {
        type: Number, // Assuming "yoe" stands for years of experience
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    aadharcard: {
        type: String, // Assuming aadharcard is a cloudinary image URL
        required: true
    },
    pancard: {
        type: String, // Assuming pancard is a cloudinary image URL
        required: true
    },
    accountDetails: {
        bankName: {
            type: String,
            required: true
        },
        accountNumber: {
            type: String,
            required: true
        },
        ifscNumber: {
            type: String,
            required: true
        }
    },
    availability: {
        type: Boolean,
        default: true // Default value, change as per your requirements
    },
    clients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }],
    createdAt: {
        type: String,
        default: Date.now
    },
});

module.exports = mongoose.model("Trainer", TrainerSchema);