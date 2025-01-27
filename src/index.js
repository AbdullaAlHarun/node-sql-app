const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

// CORS Configuration
const allowedOrigins = [
  'https://node-sql-642pkwfug-abdulla-al-haruns-projects.vercel.app', 
  'https://node-sql-jtie4n2nd-abdulla-al-haruns-projects.vercel.app', 
  'http://localhost:5000'  // Include localhost for testing
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true // Allow cookies and credentials
}));

// Middleware
app.use(express.json());

// Serve static files
app.use(express.static('public'));

// API routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.get('/', (req, res) => {
  res.send('Server is running successfully');
});

const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
