const express = require('express');
const router = express.Router()

const ratingController = require('../controller/rating.controller.js')
const authenticate = require('../middleware/authenticate.js');




router.post('/create', authenticate,ratingController.createRating)
router.put('/product/:productId', authenticate,ratingController.getAllRatings)



module.exports = router;