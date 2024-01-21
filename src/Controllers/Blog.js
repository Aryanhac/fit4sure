const Blog = require('../Model/Blog');
const catchAsyncError = require('../../middleware/catchAsyncError');

// Creating new Blog
const newBlog = catchAsyncError(async (req,res,next)=>{
    let data = req.body;
    const d = new Date();
    data['createdAt']=d;
    data['author']=req.user.id;
    const newBlog = await Blog.create(data);
    res.status(201).json({
        success:true
    })
})

// READ all blog posts
const getAllBlog = catchAsyncError(async (req,res,next)=>{
    const blogs = await Blog.find();
    res.status(200).json({
        blogs
    });
})

// READ a specific blog post by ID
const getSpecificBlog = catchAsyncError(async (req,res,next)=>{
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      res.status(200).json({blog});
    } else {
      return next(new ErrorHandling(400, "blog not found"));
    }
})

// UPDATE a specific blog post by ID
const updateSpecificBlog = catchAsyncError(async (req,res,next)=>{
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedBlog) {
      res.status(200).json(updatedBlog);
    } else {
      return next(new ErrorHandling(400, "blog not found"));
    }
})

// DELETE a specific blog post by ID
const deleteSpecificBlog = catchAsyncError(async (req,res,next)=>{
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (deletedBlog) {
      res.status(200).json(deletedBlog);
    } else {
      return next(new ErrorHandling(400, "blog not found"));
    }
})


module.exports = {newBlog,getAllBlog,getSpecificBlog,updateSpecificBlog,deleteSpecificBlog};
