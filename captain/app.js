const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const connectToDB = require("./db/db.js");
const captainRoutes = require('./routes/captain.routes.js');
const cookieParser = require('cookie-parser');

// Connect to DB
connectToDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api', captainRoutes);



module.exports=app;