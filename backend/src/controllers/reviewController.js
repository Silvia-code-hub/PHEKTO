const db = require('../config/database');

const reviewController = {
  
    getProductReviews: async (req, res) => {
        try {
            const { productId } = req.params;

            const reviews = await db.query(
                `SELECT 
                    r.review_id,
                    r.product_id,
                    r.user_id,
                    r.rating,
                    r.comment,
                    r.created_at,
                    u.username,
                    u.first_name,
                    u.last_name
                 FROM reviews r
                 JOIN users u ON r.user_id = u.user_id
                 WHERE r.product_id = ?
                 ORDER BY r.created_at DESC`,
                [productId]
            );

           
            const stats = await db.getOne(
                `SELECT 
                    COUNT(*) as total_reviews,
                    COALESCE(AVG(rating), 0) as average_rating
                 FROM reviews
                 WHERE product_id = ?`,
                [productId]
            );

            res.json({
                success: true,
                data: reviews,
                stats: {
                    total_reviews: stats.total_reviews,
                    average_rating: parseFloat(stats.average_rating).toFixed(1)
                }
            });
        } catch (error) {
            console.error('Get reviews error:', error);
            res.status(500).json({ success: false, error: 'Failed to fetch reviews' });
        }
    },

    
    addReview: async (req, res) => {
        try {
            const { product_id, user_id, rating, comment } = req.body;

            if (!product_id || !user_id || !rating) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'product_id, user_id, and rating are required' 
                });
            }

            if (rating < 1 || rating > 5) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'Rating must be between 1 and 5' 
                });
            }

           
            const existing = await db.getOne(
                'SELECT review_id FROM reviews WHERE user_id = ? AND product_id = ?',
                [user_id, product_id]
            );

            if (existing) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'You have already reviewed this product' 
                });
            }

            await db.insert(
                'INSERT INTO reviews (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?)',
                [product_id, user_id, rating, comment || null]
            );

            res.status(201).json({ 
                success: true, 
                message: 'Review added successfully' 
            });
        } catch (error) {
            console.error('Add review error:', error);
            res.status(500).json({ success: false, error: 'Failed to add review' });
        }
    },

    
    deleteReview: async (req, res) => {
        try {
            const { reviewId } = req.params;
            const { user_id } = req.body;

            if (!user_id) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'user_id is required' 
                });
            }

            const review = await db.getOne(
                'SELECT review_id FROM reviews WHERE review_id = ? AND user_id = ?',
                [reviewId, user_id]
            );

            if (!review) {
                return res.status(404).json({ 
                    success: false, 
                    error: 'Review not found or does not belong to you' 
                });
            }

            await db.delete('DELETE FROM reviews WHERE review_id = ?', [reviewId]);

            res.json({ success: true, message: 'Review deleted' });
        } catch (error) {
            console.error('Delete review error:', error);
            res.status(500).json({ success: false, error: 'Failed to delete' });
        }
    }
};

module.exports = reviewController;