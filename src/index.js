const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Configure CORS properly with allowed frontend URLs
const allowedOrigins = [
    'https://node-sql-nc24oy92i-abdulla-al-haruns-projects.vercel.app', // Your deployed frontend
    'http://localhost:5000' // Local testing (optional)
];

const corsOptions = {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

// Import routes
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Base route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Start server
const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
