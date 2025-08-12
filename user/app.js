const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const connectToDB = require("./db/db.js");
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');

// Connect to DB
connectToDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api', userRoutes);



module.exports=app;