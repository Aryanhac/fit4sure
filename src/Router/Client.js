const Express=require('express');
const {isAuthentication,isAuthorizeRole}=require('../../middleware/authentication');
const app=Express.Router();
const {getClients,getClient}=require('../Controllers/Client');

app.get('/getClients',isAuthentication,isAuthorizeRole('admin'),getClients);
app.get('/getClient/:id',isAuthentication,isAuthorizeRole('admin'),getClient);

module.exports=app;