const express = require('express');
const router = express.Router()

const productController = require('../controller/product.controller.js');
const authenticate = require('../middleware/authenticate.js');



router.post('/', authenticate, productController.createProduct)
router.post('/creates', productController.createMultipleProducts)
router.delete('/:id', authenticate, productController.deleteProduct)
router.put('/:id', authenticate, productController.updateProduct)



module.exports = router;