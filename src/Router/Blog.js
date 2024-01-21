const Express=require('express');
const {isAuthentication,isAuthorizeRole}=require('../../middleware/authentication');
const app=Express.Router();
const {newBlog,getAllBlog,getSpecificBlog,updateSpecificBlog,deleteSpecificBlog} = require('../Controllers/Blog');

app.post('/addNewBlog',isAuthentication,isAuthorizeRole('admin'),newBlog);
app.post('/updateBlog/:id',isAuthentication,isAuthorizeRole('admin'),updateSpecificBlog);
app.get('/getAllBlogs',getAllBlog);
app.get('/getSpecificBlog/:id',getSpecificBlog);
app.delete('/deleteSpecificBlog',isAuthentication,isAuthorizeRole('admin'),deleteSpecificBlog);

module.exports=app;