const mongoose=require('mongoose');
const validator=require('validator');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');
const crypto=require('crypto');
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        require:[true,'Please Enter Your Name'],
        maxlength:[30,'Name should be less than or equal to 30 characters'],
        minlength:[4,"Name should have at least 4 character"]
    },
    email:{
        type:String,
        require:[true,'Please Enter Your Email'],
        validate:[validator.isEmail,'Please Enter a valid Email'],
        unique:true
    },
    password:{
        type:String,
        require:[true,'Please Enter Your Password'],
        minlength:[8,'password should have atleast 8 characters'],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
   
    role:{
        type:String,
        default:'user'
    },
    createdAt:{
        type:String,
        require:true
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
});

UserSchema.pre('save',async function(next){
//only generate hash when password is modified
   if(!this.isModified("password")){
       next();
   }
   this.password=await bcryptjs.hash(this.password, bcryptjs.genSaltSync(12));
})

// for generating token
UserSchema.methods.getJwtToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_ID,{
        expiresIn:process.env.JWT_EXPIRE,
    })
};
//for checking Password
UserSchema.methods.isCorrectPassword= async function(password){
    return await bcryptjs.compare(password,this.password);
}
//for reset Password
UserSchema.methods.getResetPasswordToken=function(){
    //generate Reset token
    const token= crypto.randomBytes(20).toString("hex");
    //hashing and add token into resetPassword token
    this.resetPasswordToken=crypto.createHash("sha256").update(token).digest("hex");
    this.resetPasswordExpire=Date.now()+15*60*1000;
    return token;

}
module.exports=mongoose.model("User",UserSchema);