const dotenv = require("dotenv")
dotenv.config();


const express =require('express');
const app=express();
const rideRoutes = require('./routes/ride.routes');
const connectToDB = require("./db/db.js");
const cookieParser = require('cookie-parser'); 
const connectToRabbitMQ =require("./service/rabbit.js");
connectToRabbitMQ.connect()


// Connect to DB
connectToDB();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser()); 


// Routes

app.use('/api', rideRoutes);



module.exports=app;