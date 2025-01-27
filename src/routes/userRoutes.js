const express = require('express');
const { getUsers, createUser, updateUser, deleteUser, loginUser } = require('../controllers/userController');
const authenticateUser = require('../middleware/authMiddleware'); // Ensure this is correct

const router = express.Router();

// Public route for login
router.post('/login', loginUser);

// Protected routes that require authentication
router.get('/',  getUsers);
router.post('/', createUser);
router.put('/:id', authenticateUser, updateUser);
router.delete('/:id', authenticateUser, deleteUser);

module.exports = router;
