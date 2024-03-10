const express = require('express');
const router = express.Router()
const authContoller = require('../controller/auth.controller.js')


router.post('/signup', authContoller.register)
router.post('/signin', authContoller.login)


module.exports = router;