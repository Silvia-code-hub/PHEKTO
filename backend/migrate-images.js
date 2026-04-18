const cloudinary = require('cloudinary').v2;
const mysql = require('mysql2/promise');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

cloudinary.config ({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
console.log('Cloudinary configured for cloud:', process.env.CLOUDINARY_CLOUD_NAME);

async function migrateImages() {
    const db = await mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    try{
        const [products] = await db.query(
            'SELECT product_id, image_url FROM products WHERE image_url IS NOT NULL'
);   
console.log(`Found ${products.length} products with images`);

for (const product of products)  {
     if (product.image_url && product.image_url.startsWith('/uploads/')) {
        const localPath = path.join(__dirname, product.image_url);

        if (fs.existsSync(localPath)) {
            console.log(`Uploading product ${product.product_id}: ${localPath}`);

            const result = await cloudinary.uploader.upload(localPath, {
                folder: 'products', 
                public_id: `product_${product.product_id}`

            });

            await db.query(
            'UPDATE products SET image_url = ? WHERE product_id = ?',
            [result.secure_url, product.product_id]
          );
          console.log(` Migrated product ${product.product_id}: ${result.secure_url}`);
        } else {
          console.log(` File not found: ${localPath}`);
        }
     } else {
        console.log(` Product ${product.product_id} already has cloud URL or no image`);

  }
}

const [categories] = await db.query(
      'SELECT category_id, image_url FROM categories WHERE image_url IS NOT NULL'
    );
    
    console.log(`\nFound ${categories.length} categories with images`);
    
    for (const category of categories) {
      if (category.image_url && category.image_url.startsWith('/uploads/')) {
        const localPath = path.join(__dirname, category.image_url);
        
        if (fs.existsSync(localPath)) {
          console.log(`Uploading category ${category.category_id}: ${localPath}`);
          
          const result = await cloudinary.uploader.upload(localPath, {
            folder: 'categories',
            public_id: `category_${category.category_id}`
          });
          
          await db.query(
            'UPDATE categories SET image_url = ? WHERE category_id = ?',
            [result.secure_url, category.category_id]
          );
          
          console.log(`Migrated category ${category.category_id}: ${result.secure_url}`);
           }
      }
    }
    
    console.log('\n🎉 Migration complete! All images are now on Cloudinary');
    console.log('Your local images in /uploads/ folder are still there as backup');
    
  } catch (error) {
    console.error(' Migration error:', error);
  } finally {
    await db.end();  
  }
}

migrateImages();

    




