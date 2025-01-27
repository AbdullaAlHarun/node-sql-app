const db = require('../config/db');
const bcrypt = require('bcryptjs');

exports.loginUser = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow CORS for all requests
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        // Query the database wrapped in a promise for async handling
        const getUserByEmail = (email) => {
            return new Promise((resolve, reject) => {
                db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
            });
        };

        const results = await getUserByEmail(email);

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = results[0];

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Login successful
        res.status(200).json({
            message: 'Login successful',
            user: { id: user.id, name: user.name, email: user.email },
        });

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
};
