const mongoose=require('mongoose');

const consultancyFormSchema = new mongoose.Schema({
    name: String,
    age: Number,
    country: String,
    city: String,
    email: String,
    contactNumber: String,
    gender: String,
    goal: String,
    isNew: { type: Boolean, default: true },
});

module.exports=mongoose.model("Consultancy",consultancyFormSchema);