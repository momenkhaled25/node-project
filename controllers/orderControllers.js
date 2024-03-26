const orderModel = require('./../models/orderModels');

exports.createNewOrder = async (req, res) => {
    try {
        const { userId, productsId } = req.body;

        if (!userId || !productsId || productsId.length === 0) {
            return res.status(400).json({ error: 'User ID and product IDs must be provided' });
        }

        // Create the order using the model and provided data
        const newOrder = await orderModel.create({
            userId: userId,
            productsId: productsId
        });

        if (!newOrder) {
            return res.status(400).json({ error: 'Failed to create the order' });
        }

        res.status(201).json({ success: 'Order created successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}


exports.getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find().populate('userId productsId');
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.removeOrder = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ error: "No valid ID provided" });
    }

    try {
        const deletedOrder = await orderModel.findByIdAndDelete(id);

        if (!deletedOrder) {
            return res.status(404).json({ error: `No order found for ID: ${id}` });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
