const Survey = require('../models/Survey');
const Question = require('../models/Question');
const User = require('../models/User');

// Start new survey
const startSurvey = async (req, res) => {
    try {
        const { category, questionCount = 5 } = req.body;

        // Get random questions
        let query = {};
        if (category && category !== 'all') {
            query.category = category;
        }

        const questions = await Question.aggregate([
            { $match: query },
            { $sample: { size: parseInt(questionCount) } }
        ]);

        if (questions.length === 0) {
            return res.status(404).json({ message: 'No questions found for the selected category' });
        }

        const survey = await Survey.create({
            user: req.user._id,
            questions: questions.map(q => ({
                question: q._id
            })),
            totalQuestions: questions.length
        });

        // Return questions without correct answers
        const questionsForUser = questions.map(q => ({
            _id: q._id,
            questionText: q.questionText,
            options: q.options.map(opt => ({ text: opt.text })),
            category: q.category,
            difficulty: q.difficulty,
            points: q.points
        }));

        res.status(201).json({
            surveyId: survey._id,
            questions: questionsForUser
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Submit survey answers
const submitSurvey = async (req, res) => {
    try {
        const { surveyId, answers } = req.body;

        const survey = await Survey.findById(surveyId)
            .populate('questions.question');

        if (!survey) {
            return res.status(404).json({ message: 'Survey not found' });
        }

        if (survey.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        if (survey.completed) {
            return res.status(400).json({ message: 'Survey already completed' });
        }

        let score = 0;
        let correctAnswers = 0;

        // Calculate score and check answers
        survey.questions.forEach((item, index) => {
            const answer = answers.find(a => a.questionId === item.question._id.toString());
            if (answer) {
                const selectedOptionIndex = answer.selectedOption;
                const isCorrect = item.question.options[selectedOptionIndex].isCorrect;
                
                survey.questions[index].selectedOption = selectedOptionIndex;
                survey.questions[index].isCorrect = isCorrect;
                survey.questions[index].timeTaken = answer.timeTaken;

                if (isCorrect) {
                    score += item.question.points;
                    correctAnswers++;
                }
            }
        });

        survey.score = score;
        survey.correctAnswers = correctAnswers;
        survey.timeSpent = answers.reduce((total, answer) => total + answer.timeTaken, 0);
        survey.completed = true;

        await survey.save();

        // Update user stats
        await User.findByIdAndUpdate(req.user._id, {
            $inc: { 
                surveysTaken: 1,
                totalScore: score
            }
        });

        // Return results with explanations
        const results = survey.questions.map(item => ({
            question: item.question.questionText,
            options: item.question.options,
            selectedOption: item.selectedOption,
            isCorrect: item.isCorrect,
            explanation: item.question.explanation,
            timeTaken: item.timeTaken
        }));

        res.json({
            score,
            totalQuestions: survey.totalQuestions,
            correctAnswers,
            timeSpent: survey.timeSpent,
            results
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get user survey history
const getSurveyHistory = async (req, res) => {
    try {
        const surveys = await Survey.find({ user: req.user._id, completed: true })
            .populate('questions.question')
            .sort({ createdAt: -1 })
            .select('score totalQuestions correctAnswers timeSpent createdAt');

        res.json(surveys);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { startSurvey, submitSurvey, getSurveyHistory };