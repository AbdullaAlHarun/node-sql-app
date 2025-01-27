const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();


const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();


app.use(cors({
  origin: process.env.FRONTEND_URL || '*', 
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));

app.use(express.json());


app.use(express.static(path.join(__dirname, '../public')));


app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);


app.get('/', (req, res) => {
  res.send('Server is running successfully');
});


app.use((req, res) => {
  res.status(404).json({ error: 'Resource not found' });
});

// Start the server
const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
