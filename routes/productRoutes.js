const express = require('express');
const productController = require('./../controllers/productControllers');
const middleWares = require('./../middlewares/auth')
const router = express.Router();
const multer=require("multer");
const  path = require('path');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../Imgs'))
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
});

const upload = multer({ storage: storage })

//create a new product
router.post('/', middleWares.auth, middleWares.restrictTo('seller') , upload.single('photo'), productController.createProduct);

//Get all products
router.get('/all', productController.getAllProducts);

//get  products by sellerId
router.get('/:sellerId', middleWares.auth, middleWares.restrictTo('seller'), productController.getAllProductsBySellerId);



//get one product
router.get('/:id', productController.getProductById);

// Search
router.get('/:id', middleWares.auth , productController.searchInproduct);


//Update and delete product by product ID
router.patch('/:id', middleWares.auth, middleWares.restrictTo('seller'), productController.updateProduct);

router.delete('/:id',middleWares.restrictTo('seller'), productController.deleteProduct);

module.exports = router;





