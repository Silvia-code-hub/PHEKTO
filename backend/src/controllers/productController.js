
const db = require('../config/database');
const fs = require('fs').promises;
const path = require('path');

const productController ={
    getAllProducts: async (req, res) => {
        try{
            const products = await db.query('SELECT * FROM products ORDER BY created_at DESC');
            res.json({
                success: true,
                data: products
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Failed to retrieve products'

            });
        }
    },

    getProductById: async (req, res) => {
        try{
            const product = await db.getOne('SELECT * FROM products WHERE product_id = ?', [req.params.id]

            );
            if (!product) {
                return res.status(404).json({
                    success: false,
                    error: 'Product not found'
                });
            }
            res.json({
                success: true,
                data: product
            });
        } catch (error){
            res.status(500).json({
                success: false,
                error: 'Failed to retrieve product'
            });

        }
    },

    createProduct: async (req, res) =>{
        try{
            const { name,
                sku,
                description,
                price,
                old_price,
                image_url,
                category,
                quantity
            } = req.body;
            console.log('Creating product with data:', req.body);

            const productID = await db.insert(
                `INSERT INTO products
                (name, sku, description,price, old_price, image_url, category, quantity, created_at, updated_at) VALUES(?,?,?,?,?,?,?,?, NOW(), NOW())`, [name, sku, description, price, old_price, image_url, category, quantity]
            );
            const newProduct =await db. getOne(
                'SELECT * FROM products WHERE product_id =?', [productID]
            );
            res.status(201).json({
                success: true,
                data: newProduct
            });
            
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Failed to create product'
            });
        }
    },

 updateProduct: async (req, res) =>{
    try{
        console.log(' Updating product ID:', req.params.id);
       

        const{ name, description, price, old_price,category,quantity} = req.body;

          const existingProduct = await db.getOne('SELECT * FROM products WHERE product_id = ?', [req.params.id]);
        
        if (!existingProduct) {
            
            return res.status(404).json({
                success: false,
                error: 'Product not found'
            });
        }
        

        await db.update(
            `UPDATE products
            SET name = COALESCE(?, name),
             description = COALESCE(?, description),
             price = COALESCE(?, price),
             old_price = COALESCE(?, old_price),
             category = COALESCE(?,category),
             quantity = COALESCE(?, quantity), 
             updated_at = NOW()
             WHERE product_id = ?`,
             [   name !== undefined ? name : null,  description !== undefined ? description : null,
                price !== undefined ? price : null,
                old_price !== undefined ? old_price : null,
                category !== undefined ? category : null,
                quantity !== undefined ? quantity : null
         , req.params.id]
        );
        
        const updatedProduct = await db.getOne('SELECT * FROM products WHERE product_id = ?', [req.params.id] );
        res.json({
            success: true,
            data: updatedProduct
        });
    } catch (error) {

               
        console.error(' update:', error);

        res.status(500).json({
            success: false,
            error: 'Failed to update product' + error.message
        });

 }
 } ,

 deleteProduct: async( req, res) =>{
    try{
        await db.delete('DELETE FROM products WHERE product_id = ?', [req.params.id]);
        res.json({
            success: true, 
            message: 'Product deleted'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to delete the product'
        });
    }
 },

  uploadProductImage: async (req, res) => {
    try {
      
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: 'No image file provided'
            });
        }

        const productId = req.params.id;
        
       
        const product = await db.getOne(
            'SELECT * FROM products WHERE product_id = ?',
            [productId]
        );
        
        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Product not found'
            });
        }

        
        const fileExtension = path.extname(req.file.originalname);
        const filename = `product_${productId}_${Date.now()}${fileExtension}`;
        
        
        const uploadDir = path.join(__dirname, '../../uploads/products');
        await fs.mkdir(uploadDir, { recursive: true });
        
        
        const filePath = path.join(uploadDir, filename);
        await fs.writeFile(filePath, req.file.buffer);
        
       
        const imageUrl = `/uploads/products/${filename}`;
        await db.update(
            'UPDATE products SET image_url = ? WHERE product_id = ?',
            [imageUrl, productId]
        );
        
        res.json({
            success: true,
            message: 'Image uploaded successfully',
            data: { image_url: imageUrl }
        });
        
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to upload image'
        });
    }
 },
 getFeaturedProducts: async (req, res) => {
    try {
        const products = await db.query(
            'SELECT * FROM products WHERE is_featured = TRUE ORDER BY featured_order ASC'
        );
        
        if (!products || products.length === 0) {
            return res.json({
                success: true,
                data: [],
                message: 'No featured products found'
            });
        }
        
        res.json({
            success: true,
            data: products
        });
    } catch (error) {
        console.error('Error fetching featured products:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch featured products'
        });
    }
},


getLatestProducts: async (req, res) => {
    try {
        const products = await db.query(
            'SELECT * FROM products WHERE is_latest = TRUE ORDER BY latest_order ASC '
        );
        
        if (!products || products.length === 0) {
            return res.json({
                success: true,
                data: [],
                message: 'No latest products found'
            });
        }
        
        res.json({
            success: true,
            data: products
        });
    } catch (error) {
        console.error('Error fetching latest products:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch latest products'
        });
    }
},
getTrendingProducts: async (req, res) => {
    try {
        const products = await db.query(
            'SELECT * FROM products WHERE is_trending = TRUE ORDER BY trending_order ASC'
        );
        
        if (!products || products.length === 0) {
            return res.json({
                success: true,
                data: [],
                message: 'No trending products found'
            });
        }
        
        res.json({
            success: true,
            data: products
        });
    } catch (error) {
        console.error('Error fetching trending products:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch trending products'
        });
    }
},




};



module.exports = productController;