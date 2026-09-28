const db = require('../config/database');

const vendorController = {
  
    getVendorOrders: async (req, res) => {
        try {
            const vendorId = req.user.id;
            
            console.log(' Fetching orders for vendor:', vendorId);
            
           
            const orders = await db.query(
                `SELECT DISTINCT 
                    o.order_id,
                    o.order_number,
                    o.total_amount,
                    o.status,
                    o.payment_method,
                    o.shipping_address,
                    o.created_at,
                    u.username as customer_name,
                    u.email as customer_email,
                    u.phone as customer_phone
                 FROM orders o
                 JOIN order_items oi ON o.order_id = oi.order_id
                 JOIN products p ON oi.product_id = p.product_id
                 JOIN users u ON o.user_id = u.user_id
                 WHERE p.vendor_id = ?
                 ORDER BY o.created_at DESC`,
                [vendorId]
            );
            
            
            const ordersWithItems = [];
            for (const order of orders) {
                const items = await db.query(
                    `SELECT 
                        oi.order_item_id,
                        oi.product_id,
                        oi.product_name,
                        oi.product_price,
                        oi.quantity,
                        oi.subtotal,
                        p.image_url
                     FROM order_items oi
                     JOIN products p ON oi.product_id = p.product_id
                     WHERE oi.order_id = ? AND p.vendor_id = ?`,
                    [order.order_id, vendorId]
                );
                
                
                const vendorTotal = items.reduce(
                    (sum, item) => sum + parseFloat(item.subtotal), 
                    0
                );
                
                ordersWithItems.push({
                    ...order,
                    vendor_total: vendorTotal,
                    items: items
                });
            }
            
            res.json({ 
                success: true, 
                data: ordersWithItems 
            });
        } catch (error) {
            console.error(' Vendor orders error:', error);
            res.status(500).json({ 
                success: false, 
                error: 'Failed to fetch vendor orders' 
            });
        }
    },

    
    getVendorStats: async (req, res) => {
        try {
            const vendorId = req.user.id;
            
            
            const products = await db.getOne(
                'SELECT COUNT(*) as count FROM products WHERE vendor_id = ?',
                [vendorId]
            );
            
           
            const orders = await db.getOne(
                `SELECT COUNT(DISTINCT o.order_id) as count 
                 FROM orders o
                 JOIN order_items oi ON o.order_id = oi.order_id
                 JOIN products p ON oi.product_id = p.product_id
                 WHERE p.vendor_id = ?`,
                [vendorId]
            );
            
            
            const revenue = await db.getOne(
                `SELECT COALESCE(SUM(oi.subtotal), 0) as total
                 FROM order_items oi
                 JOIN products p ON oi.product_id = p.product_id
                 JOIN orders o ON oi.order_id = o.order_id
                 WHERE p.vendor_id = ? AND o.status != 'cancelled'`,
                [vendorId]
            );
            
            
            const pendingOrders = await db.getOne(
                `SELECT COUNT(DISTINCT o.order_id) as count 
                 FROM orders o
                 JOIN order_items oi ON o.order_id = oi.order_id
                 JOIN products p ON oi.product_id = p.product_id
                 WHERE p.vendor_id = ? AND o.status = 'pending'`,
                [vendorId]
            );
            
            
            const lowStock = await db.getOne(
                'SELECT COUNT(*) as count FROM products WHERE vendor_id = ? AND quantity < 10 AND quantity > 0',
                [vendorId]
            );
            
            res.json({
                success: true,
                data: {
                    totalProducts: products.count,
                    totalOrders: orders.count,
                    totalRevenue: parseFloat(revenue.total),
                    pendingOrders: pendingOrders.count,
                    lowStockProducts: lowStock.count
                }
            });
        } catch (error) {
            console.error(' Vendor stats error:', error);
            res.status(500).json({ 
                success: false, 
                error: 'Failed to fetch vendor stats' 
            });
        }
    },

    
    getVendorOrderById: async (req, res) => {
        try {
            const vendorId = req.user.id;
            const { orderId } = req.params;
            
            
            const order = await db.getOne(
                `SELECT 
                    o.*,
                    u.username as customer_name,
                    u.email as customer_email,
                    u.phone as customer_phone,
                    u.first_name,
                    u.last_name
                 FROM orders o
                 JOIN users u ON o.user_id = u.user_id
                 JOIN order_items oi ON o.order_id = oi.order_id
                 JOIN products p ON oi.product_id = p.product_id
                 WHERE o.order_id = ? AND p.vendor_id = ?
                 LIMIT 1`,
                [orderId, vendorId]
            );
            
            if (!order) {
                return res.status(404).json({ 
                    success: false, 
                    error: 'Order not found or does not contain your products' 
                });
            }
            
            
            const items = await db.query(
                `SELECT 
                    oi.*,
                    p.image_url,
                    p.sku
                 FROM order_items oi
                 JOIN products p ON oi.product_id = p.product_id
                 WHERE oi.order_id = ? AND p.vendor_id = ?`,
                [orderId, vendorId]
            );
            
            res.json({
                success: true,
                data: {
                    ...order,
                    items: items
                }
            });
        } catch (error) {
            console.error(' Vendor order details error:', error);
            res.status(500).json({ 
                success: false, 
                error: 'Failed to fetch order details' 
            });
        }
    },


    updateOrderStatus: async (req, res) => {
        try {
            const vendorId = req.user.id;
            const { orderId } = req.params;
            const { status } = req.body;
            
            
            if (!['shipped', 'processing'].includes(status)) {
                return res.status(403).json({
                    success: false,
                    error: 'Vendors can only update to processing or shipped'
                });
            }
            
            
            const order = await db.getOne(
                `SELECT o.order_id 
                 FROM orders o
                 JOIN order_items oi ON o.order_id = oi.order_id
                 JOIN products p ON oi.product_id = p.product_id
                 WHERE o.order_id = ? AND p.vendor_id = ?
                 LIMIT 1`,
                [orderId, vendorId]
            );
            
            if (!order) {
                return res.status(404).json({
                    success: false,
                    error: 'Order not found or does not contain your products'
                });
            }
            
            await db.update(
                'UPDATE orders SET status = ?, updated_at = NOW() WHERE order_id = ?',
                [status, orderId]
            );
            
            res.json({
                success: true,
                message: 'Order status updated successfully'
            });
        } catch (error) {
            console.error(' Update order status error:', error);
            res.status(500).json({ 
                success: false, 
                error: 'Failed to update order status' 
            });
        }
    }
};

module.exports = vendorController;