const Express=require('express');
const {isAuthentication,isAuthorizeRole}=require('../../middleware/authentication');
const app=Express.Router();
const {getTrainers,getTrainer,addTrainer,updateTrainer,assignTrainer, deleteTrainer, updateTrainerAvailability}=require('../Controllers/Trainer');

app.get('/getTrainers',getTrainers);
app.get('/getTrainer/:id',getTrainer);
app.post('/addTrainer',addTrainer);
app.delete('/deleteTrainer/:id',deleteTrainer);
app.put('/updateTrainer/:id',isAuthentication,isAuthorizeRole('admin'),updateTrainer);
app.put('/updateTrainerAvailability/:id',isAuthentication,isAuthorizeRole('admin'),updateTrainerAvailability)
app.post('/assignTrainer',isAuthentication,isAuthorizeRole('admin'),assignTrainer)

module.exports=app;