const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateToken, authorizeAdmin } = require('../middlewares/auth');


router.use(authenticateToken, authorizeAdmin);


router.get('/stats', adminController.getDashboardStats);


router.get('/users', adminController.getAllUsers);
router.put('/users/:userId/role', adminController.updateUserRole);
router.put('/users/:userId/toggle', adminController.toggleUserVerification);
router.delete('/users/:userId', adminController.deleteUser);


router.get('/products', adminController.getAllProducts);


router.get('/orders', adminController.getAllOrders);
router.put('/orders/:orderId/status', adminController.updateOrderStatus);


router.post('/categories', adminController.createCategory);
router.put('/categories/:categoryId', adminController.updateCategory);
router.delete('/categories/:categoryId', adminController.deleteCategory);


router.get('/vendors', adminController.getVendors);
router.get('/vendors/:vendorId', adminController.getVendorDetails);

module.exports = router;