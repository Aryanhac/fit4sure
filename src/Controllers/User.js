const ErrorHandling =require('../../utils/Errorhandling');
const catchAsyncError = require('../../middleware/catchAsyncError');
const User=require('../Model/User');
const sendToken=require('../../utils/SendToken');
const SendMail = require('../../utils/SendMail');
const cloudinary =require('cloudinary');

//Register a User
const userRegister=catchAsyncError(async (req,res,next)=>{
    const {name,email,password}=req.body;
    const d=new Date();
    const createdAt=d.toDateString();
    
    const mycloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"Avatars",
        width:"150",
        crop:"scale"
    });
    const  user=await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:mycloud.public_id,
            url:mycloud.secure_url
        },
        createdAt
    });
    sendToken(user,res,200);
});
// log In
const signIn=catchAsyncError(async (req,res,next)=>{
    const {email,password}=req.body;
    // email and password both should be present
    if(!email || !password){
        return next(new ErrorHandling(400,'Please Enter Email or Password'));
    }
    const user = await User.findOne({email}).select('+password');
    if(!user){
        return next(new ErrorHandling(401,'Invalid Email or Password'));
    }
    const isCorrectPassword= await user.isCorrectPassword(password);
    if(!isCorrectPassword){
        return next(new ErrorHandling(401,'Invalid Email or Password'));
    };
    sendToken(user,res,200);
})

//logged Out
const logOut=catchAsyncError((req,res,next)=>{
    res.cookie("token",null,{
        httpOnly:true,
        expires:new Date(Date.now())
    })
    res.json({
        success:true,
        message:"Successfully logged Out"
    })
})

//Get Profile
const getProfile=catchAsyncError(async(req,res,next)=>{
    const user=await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user
    })
});

//Update Password
const updatePassword=catchAsyncError(async (req,res,next)=>{
    const user=await User.findById(req.user.id).select("+password");
    const isPasswordCorrect= user.isCorrectPassword(req.body.oldPassword);
    if(!isPasswordCorrect){
        return next(new ErrorHandling(400,"Old Password is wrong"));
    }
    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandling(400,"new Password and confirm Password are not matching"));
    }
    user.password=req.body.newPassword;
    await user.save();
    sendToken(user,res,200);
});

//update Profile
const updateProfile=catchAsyncError(async (req,res,next)=>{
    const userdata={
        name:req.body.name,
        email:req.body.email
    };

    if(req.body.avatar!==""){
        const user=await User.findById(req.user.id);
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
        const mycloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:"Avatars",
            width:"150",
            crop:"scale"
        });
        userdata.avatar={
            public_id:mycloud.public_id,
            url:mycloud.secure_url
        }
        };
    
    const user=await User.findByIdAndUpdate(req.user.id,userdata,{
        new:true,
        runValidators:true,
        useFindAndModify:true
    });
    res.status(200).json({
        success:true,
        user
    })

});



// ---admin

//getAllUsers
const getAllUsers=catchAsyncError(async(req,res,next)=>{
    const users= await User.find();
    res.status(200).json({
        success:true,
        users
    })
});
//getSingleUser
const getSingleUser=catchAsyncError(async(req,res,next)=>{
    const user=await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandling(400,"User not found"));
    }
    res.status(200).json({
        success:true,
        user
    })
});
//updateUserRole
const updateUserRole=catchAsyncError(async(req,res,next)=>{
    const userdata={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    };
    const user=await User.findByIdAndUpdate(req.params.id,userdata,{
        new:true,
        runValidators:true,
        useFindAndModify:true
    });
    res.status(200).json({
        success:true,
        user
    })
});
//deleteUser
const deleteUser=catchAsyncError(async (req,res,next)=>{
    const user=await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandling(400,"User not found"));
    }
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    await user.remove();
    res.status(200).json({
        success:true,
        message:"Deleted successfully"
    })
});
module.exports={userRegister,signIn,logOut,forgotPassword,resetPassword,getProfile,updatePassword,updateProfile,getAllUsers,getSingleUser,deleteUser,updateUserRole};