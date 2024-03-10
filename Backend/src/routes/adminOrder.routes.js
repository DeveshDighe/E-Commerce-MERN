const express = require('express');
const router = express.Router()

const orderController = require('../controller/adminOrderController.js');
const authenticate = require('../middleware/authenticate.js');


router.get('/', authenticate, orderController.getAllOrders)
router.put('/:orderId/confirmed', authenticate, orderController.confirmOrders)
router.put('/:orderId/ship', authenticate, orderController.shippOrders)
router.put('/:orderId/deliver', authenticate, orderController.deliverOrders)
router.put('/:orderId/cancel', authenticate, orderController.cancelledOrders)
router.put('/:orderId/delete', authenticate, orderController.deleteOrders)



module.exports = router;