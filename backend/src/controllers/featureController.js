const db = require('../config/database');


console.log('✅ Feature controller loaded!');

const featureController = {
    getFeaturesData: async (req, res) => {
        try {
           const features = await db.getOne(`
                SELECT 
                    image_url,
                    title,
                    feature1,
                    feature2,
                    feature3,
                    button_text,
                    product_name,
                    price
                FROM features_section 
                WHERE id = 1
            `);
            
            if (!features) {
                return res.status(404).json({
                    success: false,
                    error: 'Features data not found'
                });
            }
            res.json({
                success: true,
                data: {
                    image_url: features.image_url,
                    title: features.title,
                    features: [features.feature1, features.feature2, features.feature3],
                    button_text: features.button_text,
                    product_name: features.product_name,
                    price: parseFloat(features.price)
                }
            });
        } catch (error) {
            console.error('Error fetching features data:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch features data'
            });
        }
    
    }

};
module.exports = featureController;
