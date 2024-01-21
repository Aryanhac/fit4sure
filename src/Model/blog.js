const mongoose = require('mongoose');

// Define the schema for the blog post
const blogSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  tags: [{
    type: String
  }] 
});

// Create a Blog model using the schema
const Blog = mongoose.model('Blog', blogSchema);

// Export the model for use in other files
module.exports = Blog;
