const mongoose = require("mongoose");

const BlacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
   
    default: Date.now,
    expires: 3600, // Token expires after 1 hour
  }
},
{
  timestamps:true
}
  
)

module.exports = mongoose.model("BlacklistToken", BlacklistSchema);