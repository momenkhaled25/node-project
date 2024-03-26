const bcrypt=require('bcryptjs')
const jwt = require("jsonwebtoken")
const userModel = require('../models/userModels');


exports.registerNewUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json("Email already exists.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await userModel.create({
            username,
            email,
            password: hashedPassword,
            role: role || 'buyer'
        });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please enter email and password." });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email." });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Invalid password.' });
        }

        const token = jwt.sign({ data: { email: user.email, id: user._id, role: user.role } }, process.env.SECRET_KEY);

        res.json({ message: 'Login successful.', token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error." });
    }
};


exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Internal server error." });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { userName, password } = req.body;


        if (!id) {
            return res.status(400).json({ message: "User ID is required." });
        }

        if (!userName && !password) {
            return res.status(400).json({ message: "Please provide userName or password to update." });
        }

        const updateUser = await userModel.findByIdAndUpdate(id, { userName, password }, { new: true });


        if (!updateUser) {
            return res.status(404).json({ message: "No user found with this ID." });
        }

        res.status(200).json({ user: updateUser });
    } catch (error) {
        res.status(500).json({ message: "Internal server error." });
    }
};

exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedUser = await userModel.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: "Internal server error." });
    }
};



