const Joi = require('joi');


const validateProduct = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        price: Joi.number().positive().required(),
        quantity: Joi.number().integer().min(0).required(),
        sku: Joi.string().pattern(/^[A-Z0-9-]+$/).required()
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