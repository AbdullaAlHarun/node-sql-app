const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Get all users (excluding passwords for security)
exports.getUsers = (req, res) => {
    db.query('SELECT id, name, email FROM users', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Add new user with hashed password
exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword],
            (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(201).json({ message: 'User created successfully' });
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
