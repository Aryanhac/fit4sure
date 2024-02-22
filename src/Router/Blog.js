const Express=require('express');
const {isAuthentication,isAuthorizeRole}=require('../../middleware/authentication');
const app=Express.Router();
const {addBlog,getBlogs,getBlog,updateBlog,deleteBlog} = require('../Controllers/Blog');

app.post('/addBlog',isAuthentication,isAuthorizeRole('admin'),addBlog);
app.put('/updateBlog/:id',isAuthentication,isAuthorizeRole('admin'),updateBlog);
app.get('/getBlogs',getBlogs);
app.post('/getBlog/:id',getBlog);
app.post('/deleteBlog/:id',isAuthentication,isAuthorizeRole('admin'),deleteBlog);

module.exports=app;