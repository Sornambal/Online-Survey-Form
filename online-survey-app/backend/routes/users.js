const express = require('express');
const { registerUser, loginUser, getUserProfile, getLeaderboard } = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', auth, getUserProfile);
router.get('/leaderboard', getLeaderboard);

module.exports = router;