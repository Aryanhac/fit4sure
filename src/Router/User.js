const Express=require('express');
const {isAuthentication,isAuthorizeRole}=require('../../middleware/authentication');
const app=Express.Router();
const {userRegister,signIn,logOut,forgotPassword,resetPassword,getProfile,updatePassword,updateProfile,getAllUsers,getSingleUser,updateUserRole,deleteUser}=require('../Controllers/User');
app.post('/register',userRegister);
app.post('/logIn',signIn);
app.get('/logOut',logOut);
app.get('/profile',isAuthentication,getProfile);
app.put('/profile/updatePassword',isAuthentication,updatePassword);
app.put('/profile/update',isAuthentication,updateProfile);
app.get('/admin/users',isAuthentication,isAuthorizeRole("admin"),getAllUsers);
app.route('/admin/user/:id').get(isAuthentication,isAuthorizeRole("admin"),getSingleUser).put(isAuthentication,isAuthorizeRole("admin"),updateUserRole).delete(isAuthentication,isAuthorizeRole("admin"),deleteUser);


module.exports=app;