const db = require('../config/db');

// Get all posts
exports.getPosts = (req, res) => {
    db.query('SELECT * FROM posts', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Create a new post
exports.createPost = (req, res) => {
    const { title, content, user_id } = req.body;
    db.query('INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)', 
    [title, content, user_id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Post added successfully' });
    });
};
