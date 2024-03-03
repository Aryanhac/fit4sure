const ErrorHandling = require('../../utils/Errorhandling');
const catchAsyncError = require('../../middleware/catchAsyncError');
const Client = require('../Model/Client');

// GET all trainers
const getClients = catchAsyncError(async (req, res, next) => {
    const clients = await Client.find();
    res.status(200).json({ clients });
})


// GET a specific trainer by ID
const getClient = catchAsyncError(async (req, res, next) => {
    const clientId = req.params.id;
    const client = await Client.findById(clientId);

    if (!client) {
        return next(new ErrorHandling(400, "Client not found"));
    }

    res.status(200).json({ client });
})

module.exports = { getClients, getClient };