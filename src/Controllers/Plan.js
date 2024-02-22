const ErrorHandling = require('../../utils/Errorhandling');
const catchAsyncError = require('../../middleware/catchAsyncError');
const Plan = require('../Model/Plan');

// GET all Plans
const getPlans = catchAsyncError(async (req, res, next) => {
    const Plans = await Plan.find();
    res.status(200).json({ Plans });
})


// GET a specific Plan by ID
const getPlan = catchAsyncError(async (req, res, next) => {
    const PlanId = req.params.id;
    const currentPlan = await Plan.findById(PlanId);
      
    if (!currentPlan) {
        return next(new ErrorHandling(400, "Plan not found"));
    }

    res.status(200).json({ currentPlan });
})

// POST a new Plan
const addPlan = catchAsyncError(async (req, res, next) => {
     // Create a new Plan instance with the data
     const newPlan =  await Plan.create(req.body);
     res.status(200).json({ newPlan});
})

// PUT/update a Plan by ID
const updatePlan = catchAsyncError(async (req, res, next) => {
    const PlanId = req.params.id;
    const existingPlan = await Plan.findById(PlanId);

    if (!existingPlan) {
        return next(new ErrorHandling(400, "Plan not found"));
    }

    const { title, color, description, price, note, button, options, strikePrice } = req.body;

    existingPlan.title = title;
    existingPlan.color = color;
    existingPlan.description = description;
    existingPlan.price = price;
    existingPlan.note = note;
    existingPlan.button = button;
    existingPlan.options = options;
    existingPlan.strikePrice = strikePrice;
    
    // Save the updated Plan data
    await existingPlan.save();

    res.status(200).json({ existingPlan });
})

// DELETE endpoint to remove a Plan by ID
const deletePlan = catchAsyncError(async (req, res, next) => {
    const PlanId = req.params.id;
    const deletedPlan = await Plan.findByIdAndDelete(PlanId);

    if (deletedPlan) {
        res.json({ success: true, message: 'Plan deleted successfully' });
    } else {
        return next(new ErrorHandling(400, "Plan not found"));
    }

})

module.exports = { getPlans, getPlan, addPlan, updatePlan, deletePlan };