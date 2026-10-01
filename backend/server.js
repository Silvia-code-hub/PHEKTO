const express = require('express');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const db = require('./src/config/database');
const passport = require('./src/config/passport');

const productRoutes = require('./src/routes/productRoutes');
const userRoutes = require('./src/routes/userRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const orderItemRoutes = require('./src/routes/orderItemRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const featureRoutes = require('./src/routes/featureRoutes');
const authRoutes = require('./src/routes/authRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const vendorRoutes = require('./src/routes/vendorRoutes');
const wishlistRoutes = require('./src/routes/wishlistRoutes');
const reviewRoutes = require('./src/routes/reviewRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(session({
    secret: process.env.SESSION_SECRET || 'your_session_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

app.post('/api/products/:product_id/upload-image', async (req, res) => {
    try {
        const { product_id } = req.params;
        const { image } = req.body;

        if (!image) {
            return res.status(400).json({ error: 'No image provided' });
        }

        const result = await cloudinary.uploader.upload(image, {
            upload_preset: 'ml_default',
            folder: 'products',
            public_id: `product_${product_id}_${Date.now()}`
        });

        const updateResult = await db.update(
            'UPDATE products SET image_url = ? WHERE product_id = ?',
            [result.secure_url, product_id]
        );

        if (updateResult === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({
            success: true,
            image_url: result.secure_url,
            public_id: result.public_id,
            message: 'Product image updated successfully'
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Failed to upload image: ' + error.message });
    }
});

app.post('/api/categories/:category_id/upload-image', async (req, res) => {
    try {
        const { category_id } = req.params;
        const { image } = req.body;

        if (!image) {
            return res.status(400).json({ error: 'No image provided' });
        }

        const result = await cloudinary.uploader.upload(image, {
            upload_preset: 'ml_default',
            folder: 'categories',
            public_id: `category_${category_id}`
        });

        const updateResult = await db.update(
            'UPDATE categories SET image_url = ? WHERE category_id = ?',
            [result.secure_url, category_id]
        );

        if (updateResult === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }

        res.json({
            success: true,
            image_url: result.secure_url,
            public_id: result.public_id,
            message: 'Category image updated successfully'
        });
    } catch (error) {
        console.error('Error uploading category image:', error);
        res.status(500).json({ error: 'Failed to upload image: ' + error.message });
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const products = await db.query(`
            SELECT 
                p.*,
                c.category_name,
                CASE
                    WHEN p.image_url LIKE '%cloudinary%' THEN CONCAT(
                        SUBSTRING_INDEX(p.image_url, '/upload/', 1), 
                        '/upload/w_500,h_500,c_fill,q_auto,f_auto/', 
                        SUBSTRING_INDEX(p.image_url, '/upload/', -1)
                    )
                    ELSE p.image_url
                END as optimized_image_url
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.category_id
            ORDER BY p.featured_order ASC, p.latest_order ASC
        `);
        
        res.json({
            success: true,
            products: products
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await db.getOne(
            'SELECT * FROM products WHERE product_id = ?',
            [id]
        );
        
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        if (product.image_url && product.image_url.includes('cloudinary')) {
            const parts = product.image_url.split('/upload/');
            product.optimized_image_url = `${parts[0]}/upload/w_500,h_500,c_fill,q_auto,f_auto/${parts[1]}`;
        } else {
            product.optimized_image_url = product.image_url;
        }
        
        res.json({
            success: true,
            product: product
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/categories', async (req, res) => {
    try {
        const categories = await db.query(`
            SELECT 
                c.*,
                CASE
                    WHEN c.image_url LIKE '%cloudinary%' THEN CONCAT(
                        SUBSTRING_INDEX(c.image_url, '/upload/', 1), 
                        '/upload/w_300,h_300,c_fill,q_auto,f_auto/', 
                        SUBSTRING_INDEX(c.image_url, '/upload/', -1)
                    )
                    ELSE c.image_url
                END as optimized_image_url
            FROM categories c
            ORDER BY c.display_order ASC
        `);
        
        res.json({
            success: true,
            categories: categories
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: error.message });
    }
});

if (process.env.NODE_ENV === 'development') {
    console.log('Running in development mode.');
} else {
    console.log('Running in production mode.');
}

app.get('/', (req, res) => {
    res.json({
        message: 'API is working',
        endpoints: {
            products: 'GET /api/products',
            product_detail: 'GET /api/products/:id',
            users: '/api/users',
            carts: '/api/carts',
            orders: '/api/orders',
            order_items: '/api/order_Items',
            categories: 'GET /api/categories',
            feature: '/api/features',
            auth: '/api/auth',
            upload_product_image: 'POST /api/products/:product_id/upload-image',
            upload_category_image: 'POST /api/categories/:category_id/upload-image'
        }
    });
});
console.log('Mounting auth routes at /api/auth...');
app.use('/api/auth', authRoutes);
console.log('Auth routes mounted');

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/order_Items', orderItemRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/features', featureRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/reviews', reviewRoutes);


console.log('Registered routes:');
console.log('- GET /api/products');
console.log('- GET /api/products/:id');
console.log('- GET /api/categories');
console.log('- POST /api/products/:product_id/upload-image');
console.log('- POST /api/categories/:category_id/upload-image');
console.log('- /api/users');
console.log('- /api/carts');
console.log('- /api/orders');
console.log('- /api/order_Items');
console.log('- /api/features');
console.log('- /api/auth');
console.log('- /api/admin');
console.log('- /api/vendor');
console.log('-/api/wishlist');
console.log('- /uploads (static files)');

app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found'
    });
});

app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({
        error: 'Internal Server Error'
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
    console.log(`Products API: http://localhost:${PORT}/api/products`);
    console.log(`Auth API: http://localhost:${PORT}/api/auth`);
    console.log(`Categories API: http://localhost:${PORT}/api/categories`);
    console.log(`Upload image: POST http://localhost:${PORT}/api/products/:product_id/upload-image`);
});