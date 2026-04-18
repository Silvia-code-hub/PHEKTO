const express = require('express');
const router = express.Router();
const featureController = require('../controllers/featureController');

console.log('✅ Feature routes loaded!');

router.get('/', featureController.getFeaturesData);

module.exports = router;