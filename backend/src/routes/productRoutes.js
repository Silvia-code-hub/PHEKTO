const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { upload } = require('../middlewares/upload');
const {validateProduct} = require('../middlewares/validate');
const {authenticateToken, authorizeVendororAdmin} = require ('../middlewares/auth')

router.get('/', productController.getAllProducts);
router.get('/featured', productController.getFeaturedProducts);  
router.get('/latest', productController.getLatestProducts);
router.get('/trending', productController.getTrendingProducts);
router.get('/:id',productController.getProductById);
router.post('/',authenticateToken,authorizeVendororAdmin, validateProduct, productController.createProduct);
router.put('/:id',authenticateToken,authorizeVendororAdmin, validateProduct, productController.updateProduct);
router.delete('/:id',authenticateToken,authorizeVendororAdmin, productController.deleteProduct);
router.post( '/:id/upload', authenticateToken, authorizeVendororAdmin,upload.single('image'),productController.uploadProductImage);

module.exports = router;