const express = require('express');
const router = express.Router()
const userController = require('../controller/user.controller.js');
const authenticate = require('../middleware/authenticate.js');

router.get('/profile',authenticate, userController.getUserProfile)
router.get('/',authenticate, userController.getAllUsers)

module.exports = router;