const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');


router.get('/top', categoryController.getTopCategories);
router.get('/', categoryController.getTopCategories);
router.get('/:id', categoryController.getCategoryById);
router.get('/:id/products', categoryController.getProductsByCategory);

module.exports = router;