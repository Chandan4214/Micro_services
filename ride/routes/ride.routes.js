const express = require('express');
const router = express.Router();
const rideController = require('../controllers/ride.controllers');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/create-ride', authMiddleware.userAuth, rideController.createRide)




module.exports = router;