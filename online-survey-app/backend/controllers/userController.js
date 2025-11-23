const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// Register user
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userExists = await User.findOne({ 
            $or: [{ email }, { username }] 
        });

        if (userExists) {
            return res.status(400).json({ 
                message: 'User already exists with this email or username' 
            });
        }

        const user = await User.create({
            username,
            email,
            password
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                surveysTaken: user.surveysTaken,
                totalScore: user.totalScore,
                token: generateToken(user._id)
            });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                surveysTaken: user.surveysTaken,
                totalScore: user.totalScore,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get user profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        
        if (user) {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                surveysTaken: user.surveysTaken,
                totalScore: user.totalScore,
                averageScore: user.surveysTaken > 0 ? (user.totalScore / user.surveysTaken).toFixed(2) : 0
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get leaderboard
const getLeaderboard = async (req, res) => {
    try {
        const users = await User.find({ surveysTaken: { $gt: 0 } })
            .select('username surveysTaken totalScore')
            .sort({ totalScore: -1 })
            .limit(10);

        const leaderboard = users.map((user, index) => ({
            rank: index + 1,
            username: user.username,
            surveysTaken: user.surveysTaken,
            totalScore: user.totalScore,
            averageScore: (user.totalScore / user.surveysTaken).toFixed(2)
        }));

        res.json(leaderboard);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser, getUserProfile, getLeaderboard };