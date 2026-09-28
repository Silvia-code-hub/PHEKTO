const express = require('express');
const router = express.Router();
router.get('/ping', (req, res) => {
    res.json({ message: 'Pong! Auth routes are working!' });
});
const authController = require('../controllers/authController');

console.log('✅ authRoutes loaded! Available routes: /register, /login, /google, /google/callback');

router.post('/register',authController.register);
router.post('/verify-email', authController.verifyEmail);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken); 
router.post('/logout', authController.logout);
router.get('/google', authController.googleLogin);
router.get('/google/callback', authController.googleCallback);
router.post ('/forgot-password', authController.forgotPassword);
router.post ('/reset-password', authController.resetPassword);


module.exports= router;
