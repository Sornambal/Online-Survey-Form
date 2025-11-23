const express = require('express');
const { getRandomQuestions, getAllQuestions, createQuestion, getCategories } = require('../controllers/questionController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/random/:count?', getRandomQuestions);
router.get('/categories', getCategories);
router.get('/', auth, getAllQuestions);
router.post('/', auth, createQuestion);

module.exports = router;