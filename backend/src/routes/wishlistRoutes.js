const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const { authenticateToken } = require('../middlewares/auth');

router.get('/user/:userId', authenticateToken, wishlistController.getWishlist);
router.get('/check/:userId/:productId', authenticateToken, wishlistController.checkWishlist);
router.post('/', authenticateToken, wishlistController.addToWishlist);
router.delete('/', authenticateToken, wishlistController.removeFromWishlist);

module.exports = router;