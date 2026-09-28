const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticateToken, authorizeAdmin } = require('../middlewares/auth');  

router.post('/', authenticateToken, orderController.createOrder);                                 
router.get('/user/:userId', authenticateToken, orderController.getuserOrders);                    
router.get('/', authenticateToken, authorizeAdmin, orderController.getAllOrders);                 
router.get('/:orderId', authenticateToken, orderController.getOrderById);                         
router.put('/:orderId/cancel', authenticateToken, orderController.cancelOrder);                   
router.put('/:orderId/status', authenticateToken, authorizeAdmin, orderController.updateOrderStatus);  

module.exports = router;