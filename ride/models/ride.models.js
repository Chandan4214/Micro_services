const mongoose = require("mongoose");

const rideschema = new mongoose.Schema({
  captain: {
    type: mongoose.Schema.Types.ObjectId,
  },
  rider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  pickup: {
    type: String,
    required: true,
  },
  desitanation: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["requested", "accepted", "started", "completed"],
    default: "requested",
  },
  fare: {
    type: Number,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  driverlocation: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },

  riderlocation: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});



module.exports = mongoose.model("Ride", rideschema);

