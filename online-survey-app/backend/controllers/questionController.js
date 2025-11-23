const Question = require('../models/Question');

// Get random questions
const getRandomQuestions = async (req, res) => {
    try {
        const count = parseInt(req.params.count) || 5;
        const category = req.query.category;

        let query = {};
        if (category && category !== 'all') {
            query.category = category;
        }

        const questions = await Question.aggregate([
            { $match: query },
            { $sample: { size: count } },
            { $project: { 
                questionText: 1, 
                options: { text: 1 }, 
                category: 1, 
                difficulty: 1,
                points: 1
            }}
        ]);

        res.json(questions);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all questions (for admin)
const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find().sort({ createdAt: -1 });
        res.json(questions);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Create new question
const createQuestion = async (req, res) => {
    try {
        const { questionText, options, category, difficulty, points, explanation } = req.body;

        // Validate that exactly one option is correct
        const correctOptions = options.filter(opt => opt.isCorrect);
        if (correctOptions.length !== 1) {
            return res.status(400).json({ message: 'Exactly one option must be correct' });
        }

        const question = await Question.create({
            questionText,
            options,
            category,
            difficulty,
            points,
            explanation
        });

        res.status(201).json(question);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get question categories
const getCategories = async (req, res) => {
    try {
        const categories = await Question.distinct('category');
        res.json(categories);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { 
    getRandomQuestions, 
    getAllQuestions, 
    createQuestion, 
    getCategories 
};