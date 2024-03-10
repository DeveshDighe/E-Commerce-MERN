const express = require('express');
const router = express.Router()

const productController = require('../controller/product.controller.js');
const authenticate = require('../middleware/authenticate.js');


router.get('/', productController.getAllProducts)
router.get('/p', productController.getEveryAllProducts)
router.get('/id/:id', productController.findProductById)

module.exports = router;