const db = require('../config/database');

const wishlistController = {
    
    getWishlist: async (req, res) => {
        try {
            const userId = req.params.userId;
            
            const items = await db.query(
                `SELECT 
                    w.wishlist_id,
                    w.product_id,
                    w.added_at,
                    p.name,
                    p.price,
                    p.old_price,
                    p.image_url,
                    p.sku,
                    p.quantity AS stock
                 FROM wishlists w
                 JOIN products p ON w.product_id = p.product_id
                 WHERE w.user_id = ?
                 ORDER BY w.added_at DESC`,
                [userId]
            );
            
            res.json({ success: true, data: items });
        } catch (error) {
            console.error('Get wishlist error:', error);
            res.status(500).json({ success: false, error: 'Failed to fetch wishlist' });
        }
    },

    
    addToWishlist: async (req, res) => {
        try {
            const { user_id, product_id } = req.body;
            
            if (!user_id || !product_id) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'user_id and product_id required' 
                });
            }

            
            const existing = await db.getOne(
                'SELECT wishlist_id FROM wishlists WHERE user_id = ? AND product_id = ?',
                [user_id, product_id]
            );

            if (existing) {
                return res.json({ 
                    success: true, 
                    message: 'Already in wishlist',
                    already_exists: true
                });
            }

            await db.insert(
                'INSERT INTO wishlists (user_id, product_id) VALUES (?, ?)',
                [user_id, product_id]
            );

            res.status(201).json({ 
                success: true, 
                message: 'Added to wishlist' 
            });
        } catch (error) {
            console.error('Add to wishlist error:', error);
            res.status(500).json({ success: false, error: 'Failed to add to wishlist' });
        }
    },

    
    removeFromWishlist: async (req, res) => {
        try {
            const { user_id, product_id } = req.body;
            
            await db.delete(
                'DELETE FROM wishlists WHERE user_id = ? AND product_id = ?',
                [user_id, product_id]
            );

            res.json({ success: true, message: 'Removed from wishlist' });
        } catch (error) {
            console.error('Remove wishlist error:', error);
            res.status(500).json({ success: false, error: 'Failed to remove' });
        }
    },

    
    checkWishlist: async (req, res) => {
        try {
            const { userId, productId } = req.params;
            
            const item = await db.getOne(
                'SELECT wishlist_id FROM wishlists WHERE user_id = ? AND product_id = ?',
                [userId, productId]
            );

            res.json({ 
                success: true, 
                inWishlist: !!item 
            });
        } catch (error) {
            console.error('Check wishlist error:', error);
            res.status(500).json({ success: false, error: 'Failed to check' });
        }
    }
};

module.exports = wishlistController;