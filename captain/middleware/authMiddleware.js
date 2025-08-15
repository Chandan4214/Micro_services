const jwt=require("jsonwebtoken");
const captainModel=require("../models/captain.models.js");
const  BlacklistToken  = require("../models/blacklisttoken.model.js");


module.exports.captainAuth=async(req,res,next)=>{
  try {
        const token=req.cookies.jwt   || req.headers.authorization.split(" ")[1];
        console.log(token);

        if (!token){
          return res.status(401).json({ error: "Unauthorized token" });
        }
        const isBlacklistedToken= await BlacklistToken.findOne({token});
        if(isBlacklistedToken){
          return res.status(401).json({ error: "Unauthorized" });
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const captain=await captainModel.findById(decoded.captainId);
        if (!captain){
          return res.status(401).json({ error: "Unauthorized capatin not find" });
        }
        req.captain=captain;
        next();
  } catch (error) {
    return res.status(500).json({ error: error.message } );
  }
  
}
