const ErrorHandling = require('../../utils/Errorhandling');
const catchAsyncError = require('../../middleware/catchAsyncError');
const Trainer = require('../Model/Trainer');

// GET all trainers
const getTrainers = catchAsyncError(async (req, res, next) => {
    const trainers = await Trainer.find();
    res.status(200).json({ trainers });
})


// GET a specific trainer by ID
const getTrainer = catchAsyncError(async (req, res, next) => {
    const trainerId = req.params.id;
    const trainer = await Trainer.findById(trainerId);

    if (!trainer) {
        return next(new ErrorHandling(400, "Trainer not found"));
    }

    res.status(200).json({ trainer });
})

// POST a new trainer
const addTrainer = catchAsyncError(async (req, res, next) => {
    const newTrainer = req.body;
    const createdTrainer = await Trainer.create(newTrainer);
    res.status(201).json(createdTrainer);
})

// PUT/update a trainer by ID
const updateTrainer = catchAsyncError(async (req, res, next) => {
    const trainerId = req.params.id;
    const updatedTrainer = req.body;

    const trainer = await Trainer.findByIdAndUpdate(trainerId, updatedTrainer, { new: true });

    if (!trainer) {
        return next(new ErrorHandling(400, "Trainer not found"));
    }

    res.status(200).json({ trainer });
})

const assignTrainer = catchAsyncError(async (req, res, next) => {
    const { clientId, trainerId } = req.body;
    const trainer = await Trainer.findById(trainerId);
    const client = await Client.findByIdAndUpdate(clientId, { assignedTrainer: trainerId }, { new: true });

    if (!trainer || !client) {
        return next(new ErrorHandling(400, "Trainer or Client not found"));
    }

    trainer.clients.push(client._id);
    await trainer.save();

    res.status(201).json({ success: true });
})

// DELETE endpoint to remove a trainer by ID
const deleteTrainer = catchAsyncError(async (req, res, next) => {
    const trainerId = req.params.id;
    const deletedTrainer = await Trainer.findByIdAndDelete(trainerId);

    if (deletedTrainer) {
        res.json({ success: true, message: 'Trainer deleted successfully' });
    } else {
        return next(new ErrorHandling(400, "Trainer not found"));
    }

})


module.exports = { getTrainers, getTrainer, addTrainer, updateTrainer, assignTrainer, deleteTrainer };