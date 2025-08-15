const jwt=require("jsonwebtoken");
const userModel=require("../models/user.models.js");
const BlacklistToken  = require("../models/blacklisttoken.model.js");


module.exports.userAuth=async(req,res,next)=>{
  try {
        const token= req.cookies.jwt   ||  req.headers.authorization.split(" ")[1];
        console.log(token);

        if (!token){
          return res.status(401).json({ error: "Unauthorized" });
        }
        const isBlacklistedToken=await BlacklistToken.findOne({token});
        if(isBlacklistedToken){
          return res.status(401).json({ error: "Unauthorized" });
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await userModel.findById(decoded.userId);
        if (!user){
          return res.status(401).json({ error: "Unauthorized" });
        }
        req.user=user;
        next();
  } catch (error) {
    return res.status(500).json({ error: error.message } );
  }
  
}
