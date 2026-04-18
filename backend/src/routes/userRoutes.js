 const express = require('express');
 const router = express.Router();
 const userController = require('../controllers/userController');
 const {authenticateToken, authorizeAdmin} = require('../middlewares/auth');


router.post('/login', userController.login);
router.post('/', userController.register);

 router.get('/', authenticateToken, authorizeAdmin, userController.getAllUsers);
 router.get('/:id', authenticateToken, userController.getUserById);
 router.get('/me', authenticateToken, userController.getCurrentUser);
 router.put('/:id', authenticateToken, userController.updateUser);
 router.delete('/:id', authenticateToken, userController.deleteUser);
 

 module.exports = router;
