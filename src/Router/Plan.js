const Express=require('express');
const {isAuthentication,isAuthorizeRole}=require('../../middleware/authentication');
const app=Express.Router();
const {getPlans,getPlan,addPlan,updatePlan, deletePlan}=require('../Controllers/Plan');

app.get('/getPlans',getPlans);
app.get('/getPlan/:id',isAuthentication,isAuthorizeRole('admin'),getPlan);
app.post('/addPlan',isAuthentication,isAuthorizeRole('admin'),addPlan);
app.delete('/deletePlan/:id',isAuthentication,isAuthorizeRole('admin'),deletePlan);
app.put('/updatePlan/:id',isAuthentication,isAuthorizeRole('admin'),updatePlan);

module.exports=app;