const rideModel = require("../models/ride.models.js");
const {subscribeToQueue,publishToQueue} =require('../service/rabbit.js')

module.exports.createRide=async(req,res,next)=>{
      const {pickup,desitanation}=req.body;

      const newRide=new rideModel({
            user:req.user._id,
            pickup,
            desitanation
      })

      publishToQueue("new-ride",JSON.stringify(newRide));
      // await newRide.save();
      return res.status(201).json({message:"Ride created successfully"});

}