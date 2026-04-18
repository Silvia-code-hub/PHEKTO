const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get( '/user/:userId', cartController.getUserCart);
router.post( '/', cartController.addToCart);
router.put( '/:cartId', cartController.updateCart);
router.delete( '/:cartId', cartController.removeFromCart);
router.delete('/clear/:userId', cartController.clearCart);

module.exports = router;

