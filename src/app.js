const express =require('express');
const cookieParser=require('cookie-parser');
const errorMiddleware =require('../middleware/error');
const app=express();
const bodyParser =require('body-parser');
const fileupload = require('express-fileupload');
const path=require('path');
var cors = require('cors')

//Config
if(process.env.NODE_ENV!=='Production'){
    require('dotenv').config({path:'./config/config.env'});
}


//middleware
app.use(cors({
    origin: '*',
    credentials: true }));
app.use(bodyParser.urlencoded({extended:true,limit:"100kb"}));
app.use(fileupload());
app.use(express.json({limit:"100kb"}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'../build/')));

//Router
const user=require('../src/Router/User');
const blog=require('../src/Router/Blog');
const payment=require('../src/Router/Payment');
const trainer = require('../src/Router/Trainer');
const consultancy = require('../src/Router/Consultancy');

app.use('/api',user);
// app.use('/api',blog);
app.use('/api',payment);
app.use('/api',trainer);
app.use('/api',consultancy);



//Error middleware
app.use(errorMiddleware);
module.exports=app;