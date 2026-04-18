const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
    log:['error'],
});

async function main() {
    console.log('start seeding...')

    console.log('test db connection')
    await prisma.$connect()
    console.log('db connection successful')

    const count = await prisma.products.count()
    console.log(`Found ${count} existing products`)

    await prisma.products.deleteMany()
    console.log( 'Clear existing products')
    
    const createdProducts = await prisma.products.createMany({
        data: [
            {
                name: 'wireless headphones',
                sku: 'WH-1000XM4',
                description: 'High-quality wireless headphones with noise cancellation and long battery life.',
                price: 99,
                old_price: 129.99,
                image_url: 'https://example.com/images/wireless-headphones.jpg',
                category: 'Electronics',
                quantity: 50
            },
            {
                name: 'smartwatch',
                sku: 'SW-2021',
                description: 'Feature-packed smartwatch with fitness tracking and customizable watch faces.',
                price: 149,
                old_price: 199.99,
                image_url: 'https://example.com/images/smartwatch.jpg',
                category: 'Wearables',
                quantity: 30  
            },
        ]
    })
    console.log(`Created ${createdProducts.count} products`)
    console.log('Seeding finished.')
}
main()
    .catch((error) => {
        console.error(error)
        
    })
    .finally(async () => {
        await prisma.$disconnect()
        console.log('Disconnected from database')
    })


