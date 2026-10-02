const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authenticateToken } = require('../middlewares/auth');

router.get('/product/:productId', reviewController.getProductReviews);
router.post('/', authenticateToken, reviewController.addReview);

router.delete('/:reviewId', authenticateToken, reviewController.deleteReview);

module.exports = router;