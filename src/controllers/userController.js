const db = require('../config/db');

// Get all users
exports.getUsers = (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getUsers = (req, res) => {
    db.query('SELECT id, name, email FROM users', (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  };

// Add new user
exports.createUser = (req, res) => {
    const { name, email } = req.body;
    db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User added successfully' });
    });
};
