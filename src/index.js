const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

// CORS setup allowing frontend domain
const allowedOrigins = [
  'https://node-sql-44uzkveom-abdulla-al-haruns-projects.vercel.app',  // Replace with correct frontend
  'http://localhost:5500'
];

app.use(cors());



// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', allowedOrigins[0]);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});

app.get('/', (req, res) => {
  res.send('Server is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
