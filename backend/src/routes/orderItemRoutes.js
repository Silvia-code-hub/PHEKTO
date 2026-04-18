const express = require('express');
const router = express.Router();
const orderItemController = require('../controllers/orderItemController');

router.get('/order/:orderId',orderItemController.getOrderItems);
router.get('/:itemId',orderItemController.getOrderItemById);
router.get('/user/:userId',orderItemController.getUserOrderItems);


module.exports = router;