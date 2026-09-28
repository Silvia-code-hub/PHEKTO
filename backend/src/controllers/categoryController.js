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
    },

     createCategory: async (req, res) => {
        try {
            const { name, slug, description, image_url, display_order } = req.body;

            if (!name) {
                return res.status(400).json({ success: false, error: 'Category name is required' });
            }

            const autoSlug = slug || name.toLowerCase().replace(/\s+/g, '-');

            
            const existing = await db.getOne(
                'SELECT category_id FROM categories WHERE category_slug = ?',
                [autoSlug]
            );

            if (existing) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'A category with this slug already exists' 
                });
            }

            const categoryId = await db.insert(
                `INSERT INTO categories 
                (category_name, category_slug, description, image_url, display_order, created_at, updated_at) 
                VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
                [
                    name, 
                    autoSlug, 
                    description || null, 
                    image_url || null, 
                    display_order || 0
                ]
            );

            const newCategory = await db.getOne(
                'SELECT * FROM categories WHERE category_id = ?',
                [categoryId]
            );

            res.status(201).json({ 
                success: true, 
                message: 'Category created successfully',
                data: newCategory 
            });
        } catch (error) {
            console.error('Create category error:', error);
            res.status(500).json({ success: false, error: 'Failed to create category' });
        }
    },

    
    updateCategory: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, slug, description, image_url, display_order } = req.body;

            
            const existing = await db.getOne(
                'SELECT * FROM categories WHERE category_id = ?',
                [id]
            );

            if (!existing) {
                return res.status(404).json({ success: false, error: 'Category not found' });
            }

            
            if (slug && slug !== existing.category_slug) {
                const slugTaken = await db.getOne(
                    'SELECT category_id FROM categories WHERE category_slug = ? AND category_id != ?',
                    [slug, id]
                );
                if (slugTaken) {
                    return res.status(400).json({ 
                        success: false, 
                        error: 'Slug already in use by another category' 
                    });
                }
            }

            await db.update(
                `UPDATE categories 
                 SET category_name = COALESCE(?, category_name),
                     category_slug = COALESCE(?, category_slug),
                     description = COALESCE(?, description),
                     image_url = COALESCE(?, image_url),
                     display_order = COALESCE(?, display_order),
                     updated_at = NOW()
                 WHERE category_id = ?`,
                [
                    name || null,
                    slug || null,
                    description !== undefined ? description : null,
                    image_url !== undefined ? image_url : null,
                    display_order !== undefined ? display_order : null,
                    id
                ]
            );

            const updated = await db.getOne(
                'SELECT * FROM categories WHERE category_id = ?',
                [id]
            );

            res.json({ 
                success: true, 
                message: 'Category updated successfully',
                data: updated 
            });
        } catch (error) {
            console.error('Update category error:', error);
            res.status(500).json({ success: false, error: 'Failed to update category' });
        }
    },

    
    deleteCategory: async (req, res) => {
        try {
            const { id } = req.params;

            
            const existing = await db.getOne(
                'SELECT * FROM categories WHERE category_id = ?',
                [id]
            );

            if (!existing) {
                return res.status(404).json({ success: false, error: 'Category not found' });
            }

            
            const products = await db.getOne(
                'SELECT COUNT(*) as count FROM products WHERE category_id = ?',
                [id]
            );

            if (products.count > 0) {
                return res.status(400).json({
                    success: false,
                    error: `Cannot delete — ${products.count} product(s) use this category. Reassign them first.`
                });
            }

            await db.delete('DELETE FROM categories WHERE category_id = ?', [id]);

            res.json({ 
                success: true, 
                message: 'Category deleted successfully' 
            });
        } catch (error) {
            console.error('Delete category error:', error);
            res.status(500).json({ success: false, error: 'Failed to delete category' });
        }
    }
};

module.exports = categoryController;