const db = require('../config/database');

const categoryController = {
    getTopCategories: async (req, res) => {
        try {
            const categories = await db.query(`
                SELECT 
                    c.category_id,
                    c.category_name as name,
                    c.category_slug as slug,
                    c.image_url,
                    c.display_order,
                    COUNT(p.product_id) as product_count
                FROM categories c
                LEFT JOIN products p ON p.category_id = c.category_id
                GROUP BY c.category_id
                ORDER BY c.display_order ASC
            `);
            
            res.json({
                success: true,
                data: categories
            });
        } catch (error) {
            console.error('Error fetching top categories:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch top categories'
            });
        }
    },

    getCategoryById: async (req, res) => {
        try {
            const { id } = req.params;
            const category = await db.getOne(`
                SELECT 
                    c.category_id,
                    c.category_name as name,
                    c.category_slug as slug,
                    c.image_url,
                    c.display_order,
                    c.description,
                    COUNT(p.product_id) as product_count
                FROM categories c
                LEFT JOIN products p ON p.category_id = c.category_id
                WHERE c.category_id = ?
                GROUP BY c.category_id
            `, [id]);
            
            if (!category) {
                return res.status(404).json({
                    success: false,
                    error: 'Category not found'
                });
            }
            
            res.json({
                success: true,
                data: category
            });
        } catch (error) {
            console.error('Error fetching category:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch category'
            });
        }
    },

    getProductsByCategory: async (req, res) => {
        try {
            const { id } = req.params;
            const products = await db.query(`
                SELECT p.* 
                FROM products p
                WHERE p.category_id = ?
                ORDER BY p.created_at DESC
            `, [id]);
            
            res.json({
                success: true,
                data: products,
                count: products.length
            });
        } catch (error) {
            console.error('Error fetching products by category:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch products'
            });
        }
    }
};

module.exports = categoryController;