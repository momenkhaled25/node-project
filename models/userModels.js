const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserRoles = ['buyer', 'seller'];

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: UserRoles, 
        default: 'buyer'
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

