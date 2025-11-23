import React, { useState } from 'react';
import SurveyForm from '../components/SurveyForm';
import SurveyResults from '../components/SurveyResults';

const Dashboard = ({ user }) => {
    const [surveyResults, setSurveyResults] = useState(null);
    const [showSurvey, setShowSurvey] = useState(false);

    const handleSurveyComplete = (results) => {
        setSurveyResults(results);
        setShowSurvey(false);
    };

    const handleRetakeSurvey = () => {
        setSurveyResults(null);
        setShowSurvey(true);
    };

    if (surveyResults) {
        return <SurveyResults results={surveyResults} onRetake={handleRetakeSurvey} />;
    }

    if (showSurvey) {
        return <SurveyForm user={user} onSurveyComplete={handleSurveyComplete} />;
    }

    return (
        <div style={styles.container}>
            <div style={styles.welcomeSection}>
                <h1 style={styles.welcomeTitle}>
                    Welcome back, <span style={styles.username}>{user.username}</span>! 👋
                </h1>
                <p style={styles.welcomeSubtitle}>
                    Ready to test your knowledge? Take a survey and improve your ranking!
                </p>
            </div>

            <div style={styles.quickStats}>
                <div style={styles.statCard}>
                    <div style={styles.statIcon}>📊</div>
                    <div style={styles.statContent}>
                        <div style={styles.statNumber}>{user.surveysTaken}</div>
                        <div style={styles.statLabel}>Surveys Taken</div>
                    </div>
                </div>
                <div style={styles.statCard}>
                    <div style={styles.statIcon}>⭐</div>
                    <div style={styles.statContent}>
                        <div style={styles.statNumber}>{user.totalScore}</div>
                        <div style={styles.statLabel}>Total Points</div>
                    </div>
                </div>
                <div style={styles.statCard}>
                    <div style={styles.statIcon}>📈</div>
                    <div style={styles.statContent}>
                        <div style={styles.statNumber}>{user.averageScore}</div>
                        <div style={styles.statLabel}>Average Score</div>
                    </div>
                </div>
            </div>

            <div style={styles.actionSection}>
                <div style={styles.actionCard}>
                    <h3 style={styles.actionTitle}>Start New Survey</h3>
                    <p style={styles.actionDescription}>
                        Take a 5-question survey from random categories. Test your knowledge and earn points!
                    </p>
                    <button 
                        onClick={() => setShowSurvey(true)}
                        style={styles.startButton}
                    >
                        🚀 Start Survey
                    </button>
                </div>

                <div style={styles.featureGrid}>
                    <div style={styles.featureItem}>
                        <div style={styles.featureIcon}>🏆</div>
                        <h4 style={styles.featureTitle}>Leaderboard</h4>
                        <p style={styles.featureDesc}>Compete with other users and climb the ranks</p>
                    </div>
                    <div style={styles.featureItem}>
                        <div style={styles.featureIcon}>📋</div>
                        <h4 style={styles.featureTitle}>History</h4>
                        <p style={styles.featureDesc}>Review your previous survey results</p>
                    </div>
                    <div style={styles.featureItem}>
                        <div style={styles.featureIcon}>🎯</div>
                        <h4 style={styles.featureTitle}>Categories</h4>
                        <p style={styles.featureDesc}>Questions from various knowledge domains</p>
                    </div>
                    <div style={styles.featureItem}>
                        <div style={styles.featureIcon}>⏱️</div>
                        <h4 style={styles.featureTitle}>Timed</h4>
                        <p style={styles.featureDesc}>Track your speed and accuracy</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        minHeight: '80vh',
    },
    welcomeSection: {
        textAlign: 'center',
        marginBottom: '3rem',
        padding: '2rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '20px',
        color: 'white',
    },
    welcomeTitle: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
    },
    username: {
        background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    welcomeSubtitle: {
        fontSize: '1.2rem',
        opacity: 0.9,
        maxWidth: '600px',
        margin: '0 auto',
    },
    quickStats: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem',
    },
    statCard: {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '15px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        transition: 'transform 0.3s ease',
    },
    statIcon: {
        fontSize: '3rem',
        width: '80px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: '50%',
    },
    statContent: {
        flex: 1,
    },
    statNumber: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: '0.5rem',
    },
    statLabel: {
        color: '#7f8c8d',
        fontSize: '1rem',
    },
    actionSection: {
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '2rem',
        alignItems: 'start',
    },
    actionCard: {
        backgroundColor: 'white',
        padding: '2.5rem',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        textAlign: 'center',
    },
    actionTitle: {
        fontSize: '1.8rem',
        color: '#2c3e50',
        marginBottom: '1rem',
        fontWeight: 'bold',
    },
    actionDescription: {
        color: '#7f8c8d',
        marginBottom: '2rem',
        lineHeight: '1.6',
    },
    startButton: {
        padding: '1.2rem 2.5rem',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '25px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        width: '100%',
        boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
    },
    featureGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1.5rem',
    },
    featureItem: {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '15px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        textAlign: 'center',
        transition: 'transform 0.3s ease',
    },
    featureIcon: {
        fontSize: '2.5rem',
        marginBottom: '1rem',
    },
    featureTitle: {
        fontSize: '1.3rem',
        color: '#2c3e50',
        marginBottom: '0.5rem',
        fontWeight: '600',
    },
    featureDesc: {
        color: '#7f8c8d',
        fontSize: '0.9rem',
        lineHeight: '1.5',
    },
};

// Add hover effects
Object.assign(styles.statCard, {
    ':hover': {
        transform: 'translateY(-5px)',
    }
});

Object.assign(styles.startButton, {
    ':hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
    }
});

Object.assign(styles.featureItem, {
    ':hover': {
        transform: 'translateY(-5px)',
    }
});

export default Dashboard;