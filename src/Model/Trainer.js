const mongoose=require('mongoose');

const TrainerSchema = new mongoose.Schema({
    name: String,
    specialties: [String],
    age: String,
    email: String,
    gender: String,
    experience: String,
    clients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }],
    createdAt:{
        type:String,
        default: Date.now
    },
    contactNumber: String,
});
  
module.exports=mongoose.model("Trainer",TrainerSchema);