const db = require('../config/database');

 const orderItemController = {
getOrderItems: async (req, res) => {
    try{
        const orderId = req.params.orderId;
        console.log('fetching for items', orderId);

        const items = await db.query(
            `SELECT oi.*, p.name, p.image_url, p.sku 
                 FROM order_items oi
                 JOIN products p ON oi.product_id = p.product_id
                 WHERE oi.order_id = ?
                 ORDER BY oi.order_item_id`, [orderId]
        );

        if (items.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No items found for this order'
                });
            }

            res.json({
                success: true,
                count: items.length,
                data: items
            });
    } catch (error) {
            
            res.status(500).json({
                success: false,
                message: 'Failed to fetch order items',
               
            });
        }
},
 getOrderItemById: async (req, res) => {
        try {
            const itemId = req.params.itemId;
            
            console.log('Fetching order item:', itemId);

            const item = await db.getOne(
                `SELECT oi.*, p.name, p.image_url, p.sku, p.category,
                        o.order_id, o.order_number, o.user_id
                 FROM order_items oi
                 JOIN products p ON oi.product_id = p.product_id
                 JOIN orders o ON oi.order_id = o.order_id
                 WHERE oi.order_item_id = ?`,
                [itemId]
            );

            if (!item) {
                return res.status(404).json({
                    success: false,
                    message: 'Order item not found'
                });
            }

            res.json({
                success: true,
                data: item
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch order item'               
            });
        }
    },
getUserOrderItems: async (req, res) => {
        try {
            const userId = req.params.userId;
            
            console.log('Fetching all order items for user:', userId);

            const items = await db.query(
                `SELECT oi.*, p.name, p.image_url, p.sku,
                        o.order_id, o.order_number, o.order_date, o.status
                 FROM order_items oi
                 JOIN products p ON oi.product_id = p.product_id
                 JOIN orders o ON oi.order_id = o.order_id
                 WHERE o.user_id = ?
                 ORDER BY o.order_date DESC, oi.order_item_id`,
                [userId]
            );

            res.json({
                success: true,
                count: items.length,
                data: items
            });

        } catch (error) {
              res.status(500).json({
                success: false,
                message: 'Failed to fetch user order items'
            });
        }
    },
 };

 module.exports = orderItemController;
