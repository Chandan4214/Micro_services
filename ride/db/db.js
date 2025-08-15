const   mongoose = require("mongoose");

function connectToDB() {
  mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("✅ride service Connected to MongoDB");
  }).catch((error)=>{
    console.error("❌ride service MongoDB connection failed:", error.message);
    process.exit(1); // Exit process if DB connection fails
  })
}


module.exports = connectToDB;