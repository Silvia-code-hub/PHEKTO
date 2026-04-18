const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/',orderController.createOrder);
router.get('/user/:userId',orderController.getuserOrders);
router.get('/:orderId',orderController.getOrderById);
router.put('/:orderId/cancel', orderController.cancelOrder);
router.put('/:orderId/status',orderController.updateOrderStatus);
router.get('/',orderController.getAllOrders);

module.exports = router;