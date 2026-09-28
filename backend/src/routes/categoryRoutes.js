const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authenticateToken, authorizeAdmin } = require('../middlewares/auth');

router.get('/top', categoryController.getTopCategories);
router.get('/', categoryController.getTopCategories);
router.get('/:id', categoryController.getCategoryById);
router.get('/:id/products', categoryController.getProductsByCategory);

router.post('/', authenticateToken, authorizeAdmin, categoryController.createCategory);
router.put('/:id', authenticateToken, authorizeAdmin, categoryController.updateCategory);
router.delete('/:id', authenticateToken, authorizeAdmin, categoryController.deleteCategory);

module.exports = router;