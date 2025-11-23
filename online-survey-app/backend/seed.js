const mongoose = require('mongoose');
const Question = require('./models/Question');
require('dotenv').config();

const questions = [
    {
        questionText: "What is the capital of France?",
        options: [
            { text: "London", isCorrect: false },
            { text: "Paris", isCorrect: true },
            { text: "Berlin", isCorrect: false },
            { text: "Madrid", isCorrect: false }
        ],
        category: "General Knowledge",
        difficulty: "easy",
        points: 10,
        explanation: "Paris is the capital and most populous city of France."
    },
    {
        questionText: "Which planet is known as the Red Planet?",
        options: [
            { text: "Venus", isCorrect: false },
            { text: "Mars", isCorrect: true },
            { text: "Jupiter", isCorrect: false },
            { text: "Saturn", isCorrect: false }
        ],
        category: "Science",
        difficulty: "easy",
        points: 10,
        explanation: "Mars is known as the Red Planet due to its reddish appearance caused by iron oxide on its surface."
    },
    {
        questionText: "What is 2 + 2?",
        options: [
            { text: "3", isCorrect: false },
            { text: "4", isCorrect: true },
            { text: "5", isCorrect: false },
            { text: "6", isCorrect: false }
        ],
        category: "Mathematics",
        difficulty: "easy",
        points: 5,
        explanation: "2 + 2 equals 4."
    },
    {
        questionText: "Who wrote 'Romeo and Juliet'?",
        options: [
            { text: "Charles Dickens", isCorrect: false },
            { text: "William Shakespeare", isCorrect: true },
            { text: "Jane Austen", isCorrect: false },
            { text: "Mark Twain", isCorrect: false }
        ],
        category: "Entertainment",
        difficulty: "easy",
        points: 10,
        explanation: "William Shakespeare wrote the famous tragedy 'Romeo and Juliet'."
    },
    {
        questionText: "What is the largest ocean on Earth?",
        options: [
            { text: "Atlantic Ocean", isCorrect: false },
            { text: "Indian Ocean", isCorrect: false },
            { text: "Pacific Ocean", isCorrect: true },
            { text: "Arctic Ocean", isCorrect: false }
        ],
        category: "General Knowledge",
        difficulty: "easy",
        points: 10,
        explanation: "The Pacific Ocean is the largest ocean on Earth, covering about one-third of the Earth's surface."
    },
    {
        questionText: "Which element has the chemical symbol 'O'?",
        options: [
            { text: "Gold", isCorrect: false },
            { text: "Oxygen", isCorrect: true },
            { text: "Silver", isCorrect: false },
            { text: "Iron", isCorrect: false }
        ],
        category: "Science",
        difficulty: "easy",
        points: 10,
        explanation: "Oxygen has the chemical symbol 'O'."
    },
    {
        questionText: "What is the square root of 16?",
        options: [
            { text: "2", isCorrect: false },
            { text: "4", isCorrect: true },
            { text: "6", isCorrect: false },
            { text: "8", isCorrect: false }
        ],
        category: "Mathematics",
        difficulty: "easy",
        points: 5,
        explanation: "The square root of 16 is 4, because 4 × 4 = 16."
    },
    {
        questionText: "Which sport is known as 'America's Pastime'?",
        options: [
            { text: "Basketball", isCorrect: false },
            { text: "Baseball", isCorrect: true },
            { text: "Football", isCorrect: false },
            { text: "Soccer", isCorrect: false }
        ],
        category: "Sports",
        difficulty: "easy",
        points: 10,
        explanation: "Baseball is often called 'America's Pastime' due to its long history and popularity in the United States."
    },
    {
        questionText: "In which year did World War II end?",
        options: [
            { text: "1944", isCorrect: false },
            { text: "1945", isCorrect: true },
            { text: "1946", isCorrect: false },
            { text: "1947", isCorrect: false }
        ],
        category: "History",
        difficulty: "medium",
        points: 15,
        explanation: "World War II ended in 1945 with the surrender of Japan."
    },
    {
        questionText: "What does 'HTTP' stand for?",
        options: [
            { text: "HyperText Transfer Protocol", isCorrect: true },
            { text: "High Tech Transfer Protocol", isCorrect: false },
            { text: "HyperText Transmission Protocol", isCorrect: false },
            { text: "High Transfer Text Protocol", isCorrect: false }
        ],
        category: "Technology",
        difficulty: "medium",
        points: 15,
        explanation: "HTTP stands for HyperText Transfer Protocol, the foundation of data communication on the World Wide Web."
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/survey-app');
        console.log('Connected to MongoDB');

        // Clear existing questions
        await Question.deleteMany({});
        console.log('Cleared existing questions');

        // Insert new questions
        await Question.insertMany(questions);
        console.log(`Seeded ${questions.length} questions`);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
