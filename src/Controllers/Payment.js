const Razorpay = require('razorpay');
const ErrorHandling = require('../../utils/Errorhandling');
const catchAsyncError = require('../../middleware/catchAsyncError');


var instance = new Razorpay({
    key_id: process.env.RAZOR_API_ID,
    key_secret: process.env.RAZOR_API_SECRET,
});

const checkout = catchAsyncError(async (req,res,next)=>{
    var options = {
        amount: Number(req.body.amount)*100,  // amount in the smallest currency unit
        currency: "INR",
    };

    const order = await instance.orders.create(options);
    console.log(order);
    res.status(200).json({
        success:true
    })
})

module.exports = {checkout}

