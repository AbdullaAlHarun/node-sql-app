const express = require('express');
const { getUsers, createUser, updateUser, deleteUser, loginUser } = require('../controllers/userController');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', loginUser);  // No auth required for login

router.get('/', authenticateUser, getUsers);  // Protected route
router.post('/', createUser);
router.put('/:id', authenticateUser, updateUser);  // Protected route
router.delete('/:id', authenticateUser, deleteUser);  // Protected route

module.exports = router;
