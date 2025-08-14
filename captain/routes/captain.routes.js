const express=require('express');
const router=express.Router();
const captainController=require("../controllers/captain.controllers.js")
const authMiddleware=require("../middleware/authMiddleware.js");


router.post('/register', captainController.register);
router.post('/login',    captainController.login);
router.post('/logout',   captainController.logout);
router.get('/profile',   authMiddleware.captainAuth, captainController.profile);
router.patch('/toogle-availability', authMiddleware.captainAuth, captainController.toggleAvailability)



module.exports=router;
