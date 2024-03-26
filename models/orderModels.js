const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productsId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }]
}, {
    timestamps: true
});

const order = mongoose.model('Order', orderSchema);

module.exports = order;
