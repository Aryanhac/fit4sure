const Blog = require('../Model/Blog');
const catchAsyncError = require('../../middleware/catchAsyncError');
const cloudinary = require('cloudinary');
const ErrorHandling = require('../../utils/Errorhandling');

// Creating new Blog
const addBlog = catchAsyncError(async (req, res, next) => {
  const { type, items } = req.body;
  const { author, image1, category, categoryContent, para, image2 } = items;

  const currentDate = new Date();
  const options = {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);
  const outImage = await cloudinary.v2.uploader.upload(image1, {
    folder: "Blog",
  });
  const outsideimage = outImage.secure_url;

  const inImage = await cloudinary.v2.uploader.upload(image2, {
    folder: "Blog",
  });
  const innerimage = inImage.secure_url;

  const data = {
    outsideimage,
    innerimage,
    author,
    category,
    categoryContent,
    para,
    date: formattedDate,
    title: req.body.items.title
  }

  const existingBlog = await Blog.findOne({ title: type });

  if (existingBlog) {
    existingBlog.items.push(data)
    await existingBlog.save();
  } else {
    const newBlog = new Blog({ title:type, items:data });
    await newBlog.save();
  }

  res.status(200).json({
    success: true,
    message: 'blog has been added'
  })

})

// READ all blog posts
const getBlogs = catchAsyncError(async (req, res, next) => {
  const blogs = await Blog.find();
  res.status(200).json({
    blogs
  });
})

// READ a specific blog post by ID
const getBlog = catchAsyncError(async (req, res, next) => {
  const blog = await Blog.findOne({ title: req.body.title });

  if (!blog) {
    return next(new ErrorHandling('Blog not found'));
  }

  const foundItem = blog.items.find(item => item._id.toString() === req.body.itemId);
  if (!foundItem) {
    return next(new ErrorHandling('Item not found within the specified blog'));
  }

  res.status(200).send({ foundItem });
})

// UPDATE a specific blog post by ID
const updateBlog = catchAsyncError(async (req, res, next) => {
  const { title, itemId, items } = req.body;
  const blog = await Blog.findOne({ title: title });

  if (!blog) {
    return next(new ErrorHandling('Blog not found'));
  }

  const { author, date, innerimage, category, categoryContent,para, image2, image1, outsideimage } = items;

  const data = {
    author,
    category,
    categoryContent,
    para,
    date,
    title: req.body.items.title,
    innerimage,
    outsideimage
  }

  if (image1) {
    const outImage = await cloudinary.v2.uploader.upload(image1, {
      folder: "Blog",
    });
    data['outsideimage']=outImage.secure_url;
  }

  if (image2) {
    const inImage = await cloudinary.v2.uploader.upload(image2, {
      folder: "Blog",
    });

    data['innerimage']=inImage.secure_url;
  }

  
  const foundItemIndex = blog.items.findIndex(item => item._id.toString() === itemId);

  if (foundItemIndex === -1) {
    return next(new ErrorHandling('Item not found within the specified blog'));
  }

  // Update the found item with the provided data
  blog.items[foundItemIndex] =  data;
  

  await blog.save();

  res.status(200).json({
    success: true,
    message: 'blog has been updated'
  })
})

// DELETE a specific blog post by ID
const deleteBlog = catchAsyncError(async (req, res, next) => {
  const {title, itemId}=req.body;
  const blog = await Blog.findOne({ title });

  if (!blog) {
    return next(new ErrorHandling('Blog not found'));
  }

  const foundItemIndex = blog.items.findIndex(item => item._id.toString() === itemId);

  if (foundItemIndex === -1) {
    return next(new ErrorHandling('Item not found within the specified blog'));
  }

  blog.items.splice(foundItemIndex, 1);
  await blog.save();

  res.status(200).send({ message: 'Item deleted successfully', deletedItemId: itemId });
})


module.exports = { addBlog, getBlogs, getBlog, updateBlog, deleteBlog };