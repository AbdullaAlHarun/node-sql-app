const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Get all users (excluding passwords for security)
exports.getUsers = (req, res) => {
    db.query('SELECT id, name, email FROM users', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error: ' + err.message });
        }
        res.json(results);
    });
};

// Add new user with hashed password 
exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword],
            (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Database error: ' + err.message });
                }
                res.status(201).json({ message: 'User created successfully', userId: result.insertId });
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Server error: ' + error.message });
    }
};

// User login
exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error: ' + err.message });

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = results[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        res.status(200).json({
            message: 'Login successful',
            user: { id: user.id, name: user.name, email: user.email }
        });
    });
};

// Update user by ID
exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    db.query(
        'UPDATE users SET name = ?, email = ? WHERE id = ?',
        [name, email, id],
        (err, result) => {
            if (err) return res.status(500).json({ error: 'Database error: ' + err.message });
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User updated successfully' });
        }
    );
};

// Delete user by ID
exports.deleteUser = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error: ' + err.message });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    });
};
