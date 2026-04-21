const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register',authController.register);
router.post('/verify-email', authController.verifyEmail);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken); 
router.post('/logout', authController.logout);
router.get('/google', authController.googleLogin);
router.get('/google/callback', authController.googleCallback);

module.exports= router;
