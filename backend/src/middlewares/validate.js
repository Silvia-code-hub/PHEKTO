const Joi = require('joi');


const validateProduct = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        price: Joi.number().positive().required(),
        quantity: Joi.number().integer().min(0).required(),
        sku: Joi.string().pattern(/^[A-Z0-9-]+$/).required(),
        description: Joi.string().max(2000).optional(),  
        old_price: Joi.number().positive().optional(),   
        category: Joi.string().max(100).optional(),      
        image_url: Joi.string().uri().optional() 
    });
    const {error} = schema.validate(req.body);

    if(error) {
        return res.status(400).json({
            success: false,
            error: error.details[0].message
        });
    }
    next();
};
module.exports = {
    validateProduct
};