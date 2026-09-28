const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');
const { authenticateToken, authorizeVendororAdmin } = require('../middlewares/auth');


router.use(authenticateToken, authorizeVendororAdmin);


router.get('/orders', vendorController.getVendorOrders);
router.get('/orders/:orderId', vendorController.getVendorOrderById);
router.put('/orders/:orderId/status', vendorController.updateOrderStatus);


router.get('/stats', vendorController.getVendorStats);

module.exports = router;