const express = require('express');
const userController = require('./../controllers/userControllers');
const middleWares = require('./../middlewares/auth')
const router = express.Router();

// Register
router.post('/register', userController.registerNewUser);

// Login
router.post('/login', userController.loginUser);

// Get all users
router.get('/', userController.getAllUsers);

// Update
router.patch('/update/:id', middleWares.auth , userController.updateUser);

// Delete
router.delete('/delete/:id', middleWares.auth, userController.deleteUser);


module.exports = router;
