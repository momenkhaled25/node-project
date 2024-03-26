const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderControllers');
const middleWares = require('./../middlewares/auth')

// Create
router.post('/create',middleWares.auth,middleWares.restrictTo('buyer'), orderController.createNewOrder);

// Get 
router.get('/all',middleWares.auth,middleWares.restrictTo('seller'), orderController.getAllOrders);

// Delete
router.delete('/remove/:id',middleWares.auth,middleWares.restrictTo('buyer') ,orderController.removeOrder);

module.exports = router;