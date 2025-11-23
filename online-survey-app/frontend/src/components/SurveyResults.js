import React from 'react';

const SurveyResults = ({ results, onRetake }) => {
    if (!results) return null;

    const { score, totalQuestions, correctAnswers, timeSpent, results: questionResults } = results;

    const percentage = ((correctAnswers / totalQuestions) * 100).toFixed(1);

    const getScoreColor = (percent) => {
        if (percent >= 80) return '#27ae60';
        if (percent >= 60) return '#f39c12';
        return '#e74c3c';
    };

    const getPerformanceMessage = (percent) => {
        if (percent >= 90) return 'Excellent! 🎉';
        if (percent >= 80) return 'Great Job! 👍';
        if (percent >= 70) return 'Good Work! 😊';
        if (percent >= 60) return 'Not Bad! 👌';
        return 'Keep Practicing! 💪';
    };

    return (
        <div style={styles.container}>
            <div style={styles.resultsCard}>
                <h2 style={styles.title}>Survey Results</h2>
                
                {/* Score Overview */}
                <div style={styles.scoreOverview}>
                    <div style={styles.scoreCircle}>
                        <div 
                            style={{
                                ...styles.scoreFill,
                                background: `conic-gradient(${getScoreColor(percentage)} ${percentage}%, #ecf0f1 0)`
                            }}
                        />
                        <div style={styles.scoreText}>
                            <div style={styles.scorePercentage}>{percentage}%</div>
                            <div style={styles.scoreLabel}>Score</div>
                        </div>
                    </div>
                    <div style={styles.stats}>
                        <div style={styles.statItem}>
                            <div style={styles.statNumber}>{correctAnswers}/{totalQuestions}</div>
                            <div style={styles.statLabel}>Correct Answers</div>
                        </div>
                        <div style={styles.statItem}>
                            <div style={styles.statNumber}>{score}</div>
                            <div style={styles.statLabel}>Total Points</div>
                        </div>
                        <div style={styles.statItem}>
                            <div style={styles.statNumber}>{Math.floor(timeSpent / 60)}m {timeSpent % 60}s</div>
                            <div style={styles.statLabel}>Time Spent</div>
                        </div>
                    </div>
                </div>

                {/* Performance Message */}
                <div style={styles.performanceMessage}>
                    {getPerformanceMessage(percentage)}
                </div>

                {/* Detailed Results */}
                <div style={styles.detailedResults}>
                    <h3 style={styles.resultsTitle}>Detailed Results</h3>
                    {questionResults.map((result, index) => (
                        <div key={index} style={styles.questionResult}>
                            <div style={styles.questionHeader}>
                                <span style={styles.questionNumber}>Q{index + 1}:</span>
                                <span style={styles.correctness}>
                                    {result.isCorrect ? (
                                        <span style={styles.correct}>✓ Correct</span>
                                    ) : (
                                        <span style={styles.incorrect}>✗ Incorrect</span>
                                    )}
                                </span>
                                <span style={styles.time}>⏱️ {result.timeTaken}s</span>
                            </div>
                            <div style={styles.questionText}>{result.question}</div>
                            <div style={styles.optionsReview}>
                                {result.options.map((option, optIndex) => (
                                    <div
                                        key={optIndex}
                                        style={{
                                            ...styles.optionReview,
                                            ...(optIndex === result.selectedOption && !result.isCorrect 
                                                ? styles.wrongAnswer 
                                                : {}),
                                            ...(option.isCorrect 
                                                ? styles.correctAnswer 
                                                : {})
                                        }}
                                    >
                                        {option.text}
                                        {optIndex === result.selectedOption && !result.isCorrect && (
                                            <span style={styles.yourAnswer}>(Your Answer)</span>
                                        )}
                                        {option.isCorrect && (
                                            <span style={styles.correctMarker}>✓ Correct</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {result.explanation && (
                                <div style={styles.explanation}>
                                    <strong>Explanation:</strong> {result.explanation}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Action Buttons */}
                <div style={styles.actionButtons}>
                    <button 
                        onClick={onRetake}
                        style={styles.retakeButton}
                    >
                        Take Another Survey
                    </button>
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
    resultsCard: {
        backgroundColor: 'white',
        padding: '3rem',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        maxWidth: '800px',
        width: '100%',
    },
    title: {
        textAlign: 'center',
        color: '#2c3e50',
        marginBottom: '2rem',
        fontSize: '2rem',
        fontWeight: 'bold',
    },
    scoreOverview: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '2rem',
    },
    scoreCircle: {
        position: 'relative',
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        background: '#ecf0f1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scoreFill: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
    },
    scoreText: {
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
    },
    scorePercentage: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    scoreLabel: {
        color: '#7f8c8d',
        fontSize: '0.9rem',
    },
    stats: {
        display: 'flex',
        gap: '2rem',
    },
    statItem: {
        textAlign: 'center',
    },
    statNumber: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: '0.5rem',
    },
    statLabel: {
        color: '#7f8c8d',
        fontSize: '0.9rem',
    },
    performanceMessage: {
        textAlign: 'center',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '2rem',
        color: '#27ae60',
    },
    detailedResults: {
        marginBottom: '2rem',
    },
    resultsTitle: {
        color: '#34495e',
        marginBottom: '1.5rem',
        borderBottom: '2px solid #ecf0f1',
        paddingBottom: '0.5rem',
    },
    questionResult: {
        backgroundColor: '#f8f9fa',
        padding: '1.5rem',
        borderRadius: '15px',
        marginBottom: '1.5rem',
        border: '1px solid #e9ecef',
    },
    questionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        flexWrap: 'wrap',
        gap: '0.5rem',
    },
    questionNumber: {
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    correctness: {
        fontWeight: 'bold',
    },
    correct: {
        color: '#27ae60',
    },
    incorrect: {
        color: '#e74c3c',
    },
    time: {
        color: '#7f8c8d',
        fontSize: '0.9rem',
    },
    questionText: {
        marginBottom: '1rem',
        color: '#2c3e50',
        lineHeight: '1.5',
    },
    optionsReview: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    optionReview: {
        padding: '0.75rem',
        borderRadius: '8px',
        border: '1px solid #dee2e6',
        position: 'relative',
        backgroundColor: 'white',
    },
    correctAnswer: {
        backgroundColor: '#d4edda',
        borderColor: '#c3e6cb',
        color: '#155724',
    },
    wrongAnswer: {
        backgroundColor: '#f8d7da',
        borderColor: '#f5c6cb',
        color: '#721c24',
    },
    yourAnswer: {
        fontSize: '0.8rem',
        color: '#dc3545',
        marginLeft: '0.5rem',
        fontStyle: 'italic',
    },
    correctMarker: {
        float: 'right',
        color: '#28a745',
        fontWeight: 'bold',
    },
    explanation: {
        marginTop: '1rem',
        padding: '1rem',
        backgroundColor: '#d1ecf1',
        border: '1px solid #bee5eb',
        borderRadius: '8px',
        color: '#0c5460',
    },
    actionButtons: {
        textAlign: 'center',
    },
    retakeButton: {
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
    },
};

Object.assign(styles.retakeButton, {
    ':hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
    }
});

export default SurveyResults;