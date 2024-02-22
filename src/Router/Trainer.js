const Express=require('express');
const {isAuthentication,isAuthorizeRole}=require('../../middleware/authentication');
const app=Express.Router();
const {getTrainers,getTrainer,addTrainer,updateTrainer,assignTrainer, deleteTrainer}=require('../Controllers/Trainer');

app.get('/getTrainers',isAuthentication,isAuthorizeRole('admin'),getTrainers);
app.get('/getTrainer/:id',isAuthentication,isAuthorizeRole('admin'),getTrainer);
app.post('/addTrainer',isAuthentication,isAuthorizeRole('admin'),addTrainer);
app.delete('/deleteTrainer/:id',isAuthentication,isAuthorizeRole('admin'),deleteTrainer);
app.put('/updateTrainer/:id',isAuthentication,isAuthorizeRole('admin'),updateTrainer);

module.exports=app;