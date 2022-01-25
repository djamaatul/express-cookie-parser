const express = require('express');
const { route } = require('express/lib/router');
const router = express.Router();
const { register, login, getUsers } = require('../controllers/auth');
const { auth } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/users', auth, getUsers);

module.exports = router;
