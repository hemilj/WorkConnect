const User = require('../models/User');

const register = async (req, res) => {
    const { name, email, password, accountType } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        // Create new user
        const newUser = new User({ name, email, password, accountType });
        await newUser.save(); // Save user to database

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

module.exports = { register };