const Product = require("./../models/productModels");

//for seller (Admin)
exports.createProduct = async (req, res) => {

    const photo=req.file.filename
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      photo,
      sellerId: req.body.sellerId
    });
  
    try {
      const newProduct = await product.save();
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
};

//for All person
exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

  //get auth only
  exports.getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.json(product);
    } catch (err) {
      res.status(404).json({ message: 'Product not found' });
    }
};
  
// auth with seller
exports.getAllProductsBySellerId = async (req, res) => {
    try {
        const sellerId = req.params.sellerId;  
        const data = await Product.find({sellerId})
        res.status(200).json({ success: true, data: data });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}
  
// auth with seller
exports.updateProduct = async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedProduct);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
// auth with seller
exports.deleteProduct = async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: 'Product deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};
  

//Auth
exports.searchInproduct = async (req, res) => {
    try {

        const { name, sellerId } = req.query;

        const conditions = {};
        if (name) {
            conditions.name = name; 
        }
        if (sellerId) {
            conditions.sellerId = sellerId;
        }

        const products = await Product.find(conditions);

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Internal server error." });
    }
};
