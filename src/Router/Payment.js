const Express=require('express');
const {isAuthentication,isAuthorizeRole}=require('../../middleware/authentication');
const app=Express.Router();

const {checkout} = require('../Controllers/Payment');

app.post('/checkout',checkout);


module.exports=app;