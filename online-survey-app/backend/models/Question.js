const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true
    },
    options: [{
        text: {
            type: String,
            required: true
        },
        isCorrect: {
            type: Boolean,
            required: true
        }
    }],
    category: {
        type: String,
        required: true,
        enum: ['General Knowledge', 'Science', 'Technology', 'Mathematics', 'History', 'Sports', 'Entertainment']
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'medium'
    },
    points: {
        type: Number,
        default: 10
    },
    explanation: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Question', questionSchema);