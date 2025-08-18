// controllers/auth.controller.js
const captainModel = require("../models/captain.models.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BlacklistToken } = require("../models/blacklisttoken.model.js");
// controllers/auth.controller.js
const {subscribeToQueue}=require("../service/rabbit.js")



// Register
module.exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);

    // Check if email already exists
    const existingCaptain = await captainModel.findOne({ email });
    if (existingCaptain) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const captain = new captainModel({
      name,
      email,
      password: hashedPassword,
    });

    await captain.save();
    res.status(201).json({ message: "Captain registered successfully" });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Login
// Register



module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
      
    const captain = await captainModel.findOne({ email });
    if (!captain) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isPasswordValid=await bcrypt.compare(password,captain.password);
    if(!isPasswordValid){
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ captainId: captain._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("jwt", token, {
      httpOnly: true, // cookie not accessible by JavaScript
      secure: false,  // set to true if using HTTPS
      sameSite: "strict"
    });
   
    res.status(200).json({ message: "Login successful", token });
    


  } catch (error) {
    
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }

}

module.exports.logout = async (req, res) => {
  try {
    const token = req.cookies.jwt;
  
    if (!token) {
        res.status(401).json({ error: "Unauthorized token" });
    }
     await BlacklistToken.deleteMany({token});
     const blacklistedToken = new BlacklistToken({ token });
     await blacklistedToken.save();
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};




   
module.exports.profile = async (req, res) => {
  try {
    const captain = req.captain;
    const { password, ...captainWithoutPassword } = captain._doc;
    res.status(200).json({ captain: captainWithoutPassword });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.toggleAvailability = async (req, res) => {
  try {
    const captain = await captainModel.findById(req.captain._id);
    captain.isAvailable = !captain.isAvailable;
    await captain.save();
    res.status(200).json({ message: "Availability toggled successfully", captain });
  } catch (error) {
    console.error("Toggle availability error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


subscribeToQueue("new-ride",(data)=>{

  console.log(data);
}
)

