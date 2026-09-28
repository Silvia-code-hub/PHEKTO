const db = require('../config/database');

const adminController = {

    getDashboardStats: async (req, res) => {
        try{
            const totalUsers = await db.getOne('SELECT COUNT(*) as cont FROM users');

            const totalVendors = await db.getOne (" SELECT COUNT(*) as count FROM  user_type = 'vendor'");

            const totalProducts = await db.getOne ("SELECT COUNT(*) as count FROM products");

            const totalOrders = await db.getOne ("SELECT COUNT (*) as count FROM orders");

            const totalRevenue = await db.getOne (' SELECT COALESCE(SUM(total_amount), 0) as count FROM orders WHERE status !="cancelled"');

            const recentOrders = await db.query(
                `SELECT o.*, u.sername, u.email FROM orders o JOIN users u ON  o.created_at DESC LIMIT 5`
            );
            
            const recentUsers = await db.query(
                `SELECT user_id, username, email, user_type, created_at FROM users ORDER BY created_at DESC LIMIT 5`
            );
             res.json({
                success: true,
                data: {
                    stats: {
                        totalUsers: totalUsers.count,
                        totalVendors: totalVendors.count,
                        totalProducts: totalProducts.count,
                        totalOrders: totalOrders.count,
                        totalRevenue: parseFloat(totalRevenue.total)
                    },
                    recentOrders,
                    recentUsers
                }
            });

        } catch (error) {
            console.error('Dashboard stats error:', error);
            res.status(500).json({ success: false, error: 'Failed to fetch dashboard stats' });
        }
    
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await db.query(
                `SELECT user_id, username, email, first_name, last_name, phone, 
                        user_type, is_verified, created_at 
                 FROM users 
                 ORDER BY created_at DESC`
            );
            res.json({ success: true, data: users });
        } catch (error) {
            console.error('Get users error:', error);
            res.status(500).json({ success: false, error: 'Failed to fetch users' });
        }
    },

     updateUserRole: async (req, res) => {
        try {
            const { userId } = req.params;
            const { user_type } = req.body;
            
            const validRoles = ['customer', 'vendor', 'admin'];
            if (!validRoles.includes(user_type)) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'Invalid user role' 
                });
            }
            
            // Cannot change own role
            if (parseInt(userId) === req.user.id) {
                return res.status(400).json({
                    success: false,
                    error: 'You cannot change your own role'
                });
            }
            
            await db.update(
                'UPDATE users SET user_type = ? WHERE user_id = ?',
                [user_type, userId]
            );
            
            res.json({ 
                success: true, 
                message: 'User role updated successfully' 
            });
        } catch (error) {
            console.error('Update user role error:', error);
            res.status(500).json({ success: false, error: 'Failed to update user role' });
        }
    },

    toggleUserVerification: async (req, res) => {
        try {
            const { userId } = req.params;
            
            const user = await db.getOne(
                'SELECT is_verified FROM users WHERE user_id = ?',
                [userId]
            );
            
            if (!user) {
                return res.status(404).json({ success: false, error: 'User not found' });
            }
            
            const newStatus = user.is_verified === 1 ? 0 : 1;
            await db.update(
                'UPDATE users SET is_verified = ? WHERE user_id = ?',
                [newStatus, userId]
            );
            
            res.json({
                success: true,
                message: `User ${newStatus ? 'activated' : 'suspended'} successfully`
            });
        } catch (error) {
            console.error('Toggle user verification error:', error);
            res.status(500).json({ success: false, error: 'Failed to update user status' });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { userId } = req.params;
            
            if (parseInt(userId) === req.user.id) {
                return res.status(400).json({
                    success: false,
                    error: 'You cannot delete your own account'
                });
            }
            
            await db.delete('DELETE FROM users WHERE user_id = ?', [userId]);
            
            res.json({ success: true, message: 'User deleted successfully' });
        } catch (error) {
            console.error('Delete user error:', error);
            res.status(500).json({ success: false, error: 'Failed to delete user' });
        }
    },

     getAllProducts: async (req, res) => {
        try {
            const products = await db.query(
                `SELECT p.*, u.username as vendor_name 
                 FROM products p 
                 LEFT JOIN users u ON p.vendor_id = u.user_id 
                 ORDER BY p.created_at DESC`
            );
            res.json({ success: true, data: products });
        } catch (error) {
            console.error('Get all products error:', error);
            res.status(500).json({ success: false, error: 'Failed to fetch products' });
        }
    },

    getAllOrders: async (req, res) => {
        try {
            const orders = await db.query(
                `SELECT o.*, u.username, u.email 
                 FROM orders o 
                 JOIN users u ON o.user_id = u.user_id 
                 ORDER BY o.created_at DESC`
            );
            res.json({ success: true, data: orders });
        } catch (error) {
            console.error('Get all orders error:', error);
            res.status(500).json({ success: false, error: 'Failed to fetch orders' });
        }
    },

    updateOrderStatus: async (req, res) => {
        try {
            const { orderId } = req.params;
            const { status } = req.body;
            
            const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
            if (!validStatuses.includes(status)) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'Invalid order status' 
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
            console.error('Update order error:', error);
            res.status(500).json({ success: false, error: 'Failed to update order' });
        }
    },

     createCategory: async (req, res) => {
        try {
            const { name, slug, description, image_url } = req.body;
            
            if (!name) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'Category name is required' 
                });
            }
            
            const categoryId = await db.insert(
                `INSERT INTO categories (name, slug, description, image_url) 
                 VALUES (?, ?, ?, ?)`,
                [name, slug || name.toLowerCase().replace(/ /g, '-'), description || null, image_url || null]
            );
            
            const category = await db.getOne(
                'SELECT * FROM categories WHERE category_id = ?',
                [categoryId]
            );
            
            res.status(201).json({ success: true, data: category });
        } catch (error) {
            console.error('Create category error:', error);
            res.status(500).json({ success: false, error: 'Failed to create category' });
        }
    },

    updateCategory: async (req, res) => {
        try {
            const { categoryId } = req.params;
            const { name, slug, description, image_url } = req.body;
            
            await db.update(
                `UPDATE categories SET 
                    name = COALESCE(?, name),
                    slug = COALESCE(?, slug),
                    description = COALESCE(?, description),
                    image_url = COALESCE(?, image_url)
                 WHERE category_id = ?`,
                [name, slug, description, image_url, categoryId]
            );
            
            res.json({ success: true, message: 'Category updated successfully' });
        } catch (error) {
            console.error('Update category error:', error);
            res.status(500).json({ success: false, error: 'Failed to update category' });
        }
    },

    deleteCategory: async (req, res) => {
        try {
            const { categoryId } = req.params;
            
            // Check if category has products
            const products = await db.getOne(
                'SELECT COUNT(*) as count FROM products WHERE category_id = ?',
                [categoryId]
            );
            
            if (products.count > 0) {
                return res.status(400).json({
                    success: false,
                    error: 'Cannot delete category with products'
                });
            }
            
            await db.delete('DELETE FROM categories WHERE category_id = ?', [categoryId]);
            
            res.json({ success: true, message: 'Category deleted successfully' });
        } catch (error) {
            console.error('Delete category error:', error);
            res.status(500).json({ success: false, error: 'Failed to delete category' });
        }
    },

    getVendors: async (req, res) => {
        try {
            const vendors = await db.query(
                `SELECT u.*, COUNT(p.product_id) as product_count 
                 FROM users u 
                 LEFT JOIN products p ON u.user_id = p.vendor_id 
                 WHERE u.user_type = 'vendor' 
                 GROUP BY u.user_id 
                 ORDER BY u.created_at DESC`
            );
            res.json({ success: true, data: vendors });
        } catch (error) {
            console.error('Get vendors error:', error);
            res.status(500).json({ success: false, error: 'Failed to fetch vendors' });
        }
    },

     getVendorDetails: async (req, res) => {
        try {
            const { vendorId } = req.params;
            
            const vendor = await db.getOne(
                `SELECT u.*, COUNT(p.product_id) as product_count 
                 FROM users u 
                 LEFT JOIN products p ON u.user_id = p.vendor_id 
                 WHERE u.user_id = ? 
                 GROUP BY u.user_id`,
                [vendorId]
            );
            
            if (!vendor) {
                return res.status(404).json({ success: false, error: 'Vendor not found' });
            }
            
            const products = await db.query(
                'SELECT * FROM products WHERE vendor_id = ? ORDER BY created_at DESC',
                [vendorId]
            );
            
            res.json({ 
                success: true, 
                data: { ...vendor, products } 
            });
        } catch (error) {
            console.error('Get vendor details error:', error);
            res.status(500).json({ success: false, error: 'Failed to fetch vendor details' });
        }
    }
};

module.exports = adminController;