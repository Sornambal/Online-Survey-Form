const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    questions: [{
        question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        },
        selectedOption: Number,
        isCorrect: Boolean,
        timeTaken: Number // in seconds
    }],
    score: {
        type: Number,
        default: 0
    },
    totalQuestions: {
        type: Number,
        default: 5
    },
    correctAnswers: {
        type: Number,
        default: 0
    },
    timeSpent: {
        type: Number, // in seconds
        default: 0
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Survey', surveySchema);