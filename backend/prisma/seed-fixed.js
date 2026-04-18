
const db = require('../src/config/database')

async function seedDatabase() {
    console.log('start seeding...');
    

    const connection = await mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            database: 'hekto_db',
            password: '1206Mysql*LS'
        }

    );
     
    console.log('connected to mysql directly');

    try{
        console.log('Checking table structure...');
        
        await connection.execute(`
            ALTER TABLE products 
            MODIFY created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            MODIFY updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        `);
        console.log('Fixed table structure (added default timestamps)');
        const [tables] = await connection.execute(`
            SHOW TABLES LIKE 'products'
        `);
        
        if (tables.length === 0) {
            console.log(' Products table does not exist!');
           
            return;
        }
        
        console.log('Products table exists');


        await connection.execute(`
          INSERT INTO products(name, sku,description,price,old_price,image_url,category,quantity)
          VALUES('Coffee Maker', 'CM-310', 'Automatic coffee maker with timer', 49.99, 79.99, 'https://example.com/coffee.jpg', 'Home Appliances', 40)  
          `);

          console.log('Added a sample product');

          const [result] = await connection.execute('SELECT COUNT(*) as count FROM products');
        console.log(`Total products now: ${result[0].count}`);
        
        console.log('Seeding complete!');
    } catch (error) {
    console.error('Error seeding database:', error);
} finally {
    await connection.end();
    console.log('Disconnected from database');
}
} 
seedDatabase();