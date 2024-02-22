const mongoose = require('mongoose');

// Define the article schema
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  items:[{
  title: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: String, required: true },
  outsideimage: { type: String, required: true },
  innerimage: { type: String, required: true },
  category: { type: String, required: true },
  categoryContent: { type: String, required: true },
  para: { type: String, required: true },
  }
  ]
});


// Define the main model
const Blog = mongoose.model('blogSchema', blogSchema);

module.exports = Blog