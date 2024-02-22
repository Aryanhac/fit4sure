const Express=require('express');
const {isAuthentication,isAuthorizeRole}=require('../../middleware/authentication');
const app=Express.Router();
const {addConsultancyForm, updateConsultancy,getConsultancyForms,getConsultancyForm}=require('../Controllers/Consultancy');

app.get('/getConsultancyForms',isAuthentication,isAuthorizeRole('admin'),getConsultancyForms);
app.get('/getConsultancyForm/:id',isAuthentication,isAuthorizeRole('admin'),getConsultancyForm);
app.post('/addConsultancyForm',addConsultancyForm);
app.put('/updateConsultancy/:id',isAuthentication,isAuthorizeRole('admin'),updateConsultancy);

module.exports=app;