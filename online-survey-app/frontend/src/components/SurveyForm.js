import React, { useState, useEffect } from 'react';
import { surveyAPI, questionAPI } from '../services/api';

const SurveyForm = ({ user, onSurveyComplete }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [timeSpent, setTimeSpent] = useState(0);
    const [category, setCategory] = useState('all');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [surveyStarted, setSurveyStarted] = useState(false);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        loadCategories();
    }, []);

    useEffect(() => {
        let interval;
        if (surveyStarted && currentQuestion < questions.length) {
            interval = setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [surveyStarted, currentQuestion, questions.length]);

    const loadCategories = async () => {
        try {
            const response = await questionAPI.getCategories();
            setCategories(response.data);
        } catch (error) {
            console.error('Error loading categories:', error);
        }
    };

    const startSurvey = async () => {
        setLoading(true);
        try {
            const response = await surveyAPI.startSurvey({
                category,
                questionCount: 5
            });
            setQuestions(response.data.questions);
            setSurveyStarted(true);
            setCurrentQuestion(0);
            setAnswers([]);
            setTimer(0);
        } catch (error) {
            alert(error.response?.data?.message || 'Error starting survey');
        } finally {
            setLoading(false);
        }
    };

    const handleAnswer = (selectedOption) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = {
            questionId: questions[currentQuestion]._id,
            selectedOption,
            timeTaken: timer
        };
        setAnswers(newAnswers);
        setTimer(0);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            submitSurvey(newAnswers);
        }
    };

    const submitSurvey = async (finalAnswers) => {
        try {
            const response = await surveyAPI.submitSurvey({
                surveyId: questions.surveyId,
                answers: finalAnswers
            });
            onSurveyComplete(response.data);
        } catch (error) {
            alert(error.response?.data?.message || 'Error submitting survey');
        }
    };

    const getProgress = () => {
        return ((currentQuestion + 1) / questions.length) * 100;
    };

    if (!surveyStarted) {
        return (
            <div style={styles.container}>
                <div style={styles.startCard}>
                    <h2 style={styles.title}>Start New Survey</h2>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Select Category:</label>
                        <select 
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)}
                            style={styles.select}
                        >
                            <option value="all">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <button 
                        onClick={startSurvey}
                        disabled={loading}
                        style={styles.startButton}
                    >
                        {loading ? 'Starting...' : 'Start Survey (5 Questions)'}
                    </button>
                </div>
            </div>
        );
    }

    const question = questions[currentQuestion];

    return (
        <div style={styles.container}>
            <div style={styles.surveyCard}>
                {/* Progress Bar */}
                <div style={styles.progressContainer}>
                    <div 
                        style={{
                            ...styles.progressBar,
                            width: `${getProgress()}%`
                        }}
                    />
                    <div style={styles.progressText}>
                        Question {currentQuestion + 1} of {questions.length}
                    </div>
                </div>

                {/* Timer */}
                <div style={styles.timer}>
                    ⏱️ Time: {timer}s
                </div>

                {/* Question */}
                <div style={styles.questionSection}>
                    <h3 style={styles.questionText}>{question.questionText}</h3>
                    <div style={styles.questionMeta}>
                        <span style={styles.category}>{question.category}</span>
                        <span style={styles.difficulty}>{question.difficulty}</span>
                        <span style={styles.points}>{question.points} pts</span>
                    </div>
                </div>

                {/* Options */}
                <div style={styles.optionsContainer}>
                    {question.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswer(index)}
                            style={styles.optionButton}
                        >
                            {option.text}
                        </button>
                    ))}
                </div>

                {/* Navigation */}
                <div style={styles.navigation}>
                    {currentQuestion > 0 && (
                        <button
                            onClick={() => setCurrentQuestion(currentQuestion - 1)}
                            style={styles.navButton}
                        >
                            Previous
                        </button>
                    )}
                    <div style={styles.questionCounter}>
                        {currentQuestion + 1} / {questions.length}
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        padding: '2rem',
    },
    startCard: {
        backgroundColor: 'white',
        padding: '3rem',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        textAlign: 'center',
        maxWidth: '500px',
        width: '100%',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    },
    surveyCard: {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        maxWidth: '600px',
        width: '100%',
        position: 'relative',
    },
    title: {
        color: '#2c3e50',
        marginBottom: '2rem',
        fontSize: '2rem',
        fontWeight: 'bold',
    },
    formGroup: {
        marginBottom: '2rem',
        textAlign: 'left',
    },
    label: {
        display: 'block',
        marginBottom: '0.5rem',
        color: '#34495e',
        fontWeight: '600',
    },
    select: {
        width: '100%',
        padding: '0.75rem',
        border: '2px solid #bdc3c7',
        borderRadius: '10px',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.3s ease',
    },
    startButton: {
        padding: '1rem 2rem',
        backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '25px',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
        width: '100%',
    },
    progressContainer: {
        width: '100%',
        backgroundColor: '#ecf0f1',
        borderRadius: '10px',
        marginBottom: '2rem',
        position: 'relative',
        height: '8px',
    },
    progressBar: {
        height: '100%',
        backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '10px',
        transition: 'width 0.3s ease',
    },
    progressText: {
        position: 'absolute',
        top: '-25px',
        right: '0',
        color: '#7f8c8d',
        fontSize: '0.9rem',
    },
    timer: {
        position: 'absolute',
        top: '2rem',
        right: '2rem',
        backgroundColor: '#34495e',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '20px',
        fontSize: '0.9rem',
        fontWeight: 'bold',
    },
    questionSection: {
        marginBottom: '2rem',
    },
    questionText: {
        fontSize: '1.3rem',
        color: '#2c3e50',
        marginBottom: '1rem',
        lineHeight: '1.5',
    },
    questionMeta: {
        display: 'flex',
        gap: '1rem',
        marginBottom: '1rem',
    },
    category: {
        backgroundColor: '#3498db',
        color: 'white',
        padding: '0.3rem 0.8rem',
        borderRadius: '15px',
        fontSize: '0.8rem',
    },
    difficulty: {
        backgroundColor: '#e74c3c',
        color: 'white',
        padding: '0.3rem 0.8rem',
        borderRadius: '15px',
        fontSize: '0.8rem',
    },
    points: {
        backgroundColor: '#27ae60',
        color: 'white',
        padding: '0.3rem 0.8rem',
        borderRadius: '15px',
        fontSize: '0.8rem',
    },
    optionsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginBottom: '2rem',
    },
    optionButton: {
        padding: '1rem 1.5rem',
        backgroundColor: 'white',
        border: '2px solid #bdc3c7',
        borderRadius: '15px',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        textAlign: 'left',
    },
    navigation: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    navButton: {
        padding: '0.75rem 1.5rem',
        backgroundColor: '#95a5a6',
        color: 'white',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    questionCounter: {
        color: '#7f8c8d',
        fontWeight: 'bold',
    },
};

// Add hover effects
Object.assign(styles.startButton, {
    ':hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
    }
});

Object.assign(styles.optionButton, {
    ':hover': {
        borderColor: '#3498db',
        backgroundColor: '#f8f9fa',
        transform: 'translateX(5px)',
    }
});

export default SurveyForm;