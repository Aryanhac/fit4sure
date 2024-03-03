const Express=require('express');
const app=Express.Router();
const {newPayment, checkStatus} = require('../Controllers/Payment');

app.post('/newPayment',newPayment);
app.post('/checkStatus/:txnId',checkStatus);


module.exports=app;