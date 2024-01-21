const ErrorHandling = require('../../utils/Errorhandling');
const catchAsyncError = require('../../middleware/catchAsyncError');
const Consultancy = require('../Model/Consultancy');

// POST endpoint to accept new consultancy forms
const addConsultancyForm = catchAsyncError(async (req,res,next)=>{
    const newConsultancyForm = req.body;
    const createdForm = await Consultancy.create(newConsultancyForm);
    res.status(201).json(createdForm);
})


// PUT endpoint to transition a consultancy form from new to old
const updateConsultancy = catchAsyncError(async (req,res,next)=>{
    const formId = req.params.id;
    const existingForm = await Consultancy.findById(formId);
      
    if (!existingForm) {
        return next(new ErrorHandling(400, "Form not found"));
    }

    // Toggle the 'isNew' field
    existingForm.isNew = !existingForm.isNew;
  
    const updatedForm = await existingForm.save();
    res.json(updatedForm);
})


// GET endpoint to retrieve all consultancy forms
const getConsultancyForms = catchAsyncError(async (req,res,next)=>{
    const forms = await Consultancy.find();
    res.status(200).json({forms});
})

// GET endpoint to retrieve consultancy form
const getConsultancyForm = catchAsyncError(async (req,res,next)=>{
    const formId = req.params.id;
    const form = await Consultancy.findById(formId);
    if (!form) {
        return next(new ErrorHandling(400, "Form not found"));
    }

    res.status(200).json({form})
})

module.exports = {addConsultancyForm, updateConsultancy,getConsultancyForms,getConsultancyForm};