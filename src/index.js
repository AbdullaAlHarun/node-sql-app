const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

// CORS Setup with dynamic origin validation
const allowedOrigins = [
  'https://node-sql-4tnfkyi99-abdulla-al-haruns-projects.vercel.app',  // Your frontend URL
  'http://localhost:5000'  // For local testing
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error('CORS blocked:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
};

app.use(cors(corsOptions));

// Middleware to handle preflight requests manually (as an extra safeguard)
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.sendStatus(200);
});

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: err.message });
});

// Start the server
const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
