const rideModel = require("../models/ride.models.js");

module.exports.createRide=async(req,res,next)=>{
      const {pickup,desitanation}=req.body;

      const newRide=new rideModel({
            user:req.user._id,
            pickup,
            desitanation
      })
      await newRide.save();
      res.status(201).json({message:"Ride created successfully"});

}