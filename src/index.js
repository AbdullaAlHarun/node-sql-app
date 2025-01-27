const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

// Allow specific frontend URL or all origins during development
app.use(cors({
  origin: [
    'https://node-sql-jtie4n2nd-abdulla-al-haruns-projects.vercel.app', 
    'https://node-sql-amff373di-abdulla-al-haruns-projects.vercel.app'  // Add other allowed origins here
  ],
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true // Allow cookies if needed
}));

// Middleware
app.use(express.json());

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.get('/', (req, res) => {
  res.send('Server is running successfully');
});

const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
