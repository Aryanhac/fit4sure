const Express=require('express');
const {isAuthentication,isAuthorizeRole}=require('../../middleware/authentication');
const app=Express.Router();
const {addConsultancyForm, updateConsultancy,getConsultancyForms,getConsultancyForm}=require('../Controllers/Consultancy');

app.get('/getConsultancyForms',getConsultancyForms);
app.get('/getConsultancyForm/:id',getConsultancyForm);
app.post('/addConsultancyForm',addConsultancyForm);
app.put('/updateConsultancy/:id',updateConsultancy);

module.exports=app;