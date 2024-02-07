const ErrorHandling = require('../../utils/Errorhandling');
const catchAsyncError = require('../../middleware/catchAsyncError');
const Trainer = require('../Model/Trainer');
const cloudinary = require('cloudinary');

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
    console.log(req.body);
    const aadharCard = req.body.aadharCard;
    const panCard = req.body.panCard;
    const imageLinks = {};

   
    // uploading trainer AadharCard
    const aadharCloud = await cloudinary.v2.uploader.upload(aadharCard, {
        folder: "TrainerAadharCard",
    });
    imageLinks['aadhar']=aadharCloud.secure_url;

    // uploading trainer pancard
    const panCloud = await cloudinary.v2.uploader.upload(panCard, {
        folder: "TrainerPanCard",
    });
    imageLinks['pan']=panCloud.secure_url;

    const { name, gender, age, yoe, contactNumber, email, accountDetails, specialties} = req.body;

     // Create a new Trainer instance with the data
     const newTrainer =  await Trainer.create({
        name,
        gender,
        age,
        yoe,
        contactNumber,
        email,
        aadharcard: imageLinks['aadhar'],
        pancard: imageLinks['pan'],
        accountDetails,
        specialties
      });
      console.log(newTrainer)
  
      res.status(200).json({ newTrainer});
})

// PUT/update a trainer by ID
const updateTrainer = catchAsyncError(async (req, res, next) => {
    const trainerId = req.params.id;
    const existingTrainer = await Trainer.findById(trainerId);

    if (!existingTrainer) {
        return next(new ErrorHandling(400, "Trainer not found"));
    }

    const { name, gender, age, yoe, contactNumber, email, accountDetails } = req.body;

    if(req.body.aadhar){
        const aadharCard = req.body.aadharCard;
        const aadharCloud = await cloudinary.v2.uploader.upload(aadharCard, {
            folder: "TrainerAadharCard",
        });
        existingTrainer.aadhar = aadharCloud.secure_url;
    }
    
    if(req.body.pancard){
        const panCard = req.body.panCard;
        const panCloud = await cloudinary.v2.uploader.upload(panCard, {
            folder: "TrainerPanCard",
        });
        existingTrainer.pancard = panCloud.secure_url;
    }

    existingTrainer.name = name;
    existingTrainer.gender = gender;
    existingTrainer.age = age;
    existingTrainer.yoe = yoe;
    existingTrainer.contactNumber = contactNumber;
    existingTrainer.email = email;
    existingTrainer.accountDetails = accountDetails;

    // Save the updated trainer data
    await existingTrainer.save();

    res.status(200).json({ existingTrainer });
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

// update Availability of trainer by ID
const updateTrainerAvailability = catchAsyncError(async (req, res, next) => {
    const trainerId = req.params.id;

    const updatedTrainer = await Trainer.findByIdAndUpdate(
        trainerId,
        { $set: { availability: req.body.availability } },
        { new: true } // Return the updated document
      );

    if (updatedTrainer) {
        res.json({ success: true, message: 'Trainer deleted successfully' });
    } else {
        return next(new ErrorHandling(400, "Trainer not found"));
    }
})



// assing Trainer to client
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


module.exports = { getTrainers, getTrainer, addTrainer, updateTrainer, assignTrainer, updateTrainerAvailability, deleteTrainer };