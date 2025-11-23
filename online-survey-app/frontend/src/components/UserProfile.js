import React, { useState, useEffect } from 'react';
import { authAPI, surveyAPI } from '../services/api';

const UserProfile = ({ user }) => {
    const [surveyHistory, setSurveyHistory] = useState([]);
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            const [historyResponse, leaderboardResponse] = await Promise.all([
                surveyAPI.getSurveyHistory(),
                authAPI.getLeaderboard()
            ]);
            setSurveyHistory(historyResponse.data);
            setLeaderboard(leaderboardResponse.data);
        } catch (error) {
            console.error('Error loading user data:', error);
        } finally {
            setLoading(false);
        }
    };

    const getUserRank = () => {
        const userRank = leaderboard.findIndex(item => item.username === user.username);
        return userRank !== -1 ? userRank + 1 : 'N/A';
    };

    if (loading) {
        return <div style={styles.loading}>Loading...</div>;
    }

    return (
        <div style={styles.container}>
            {/* User Stats */}
            <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                    <div style={styles.statIcon}>📊</div>
                    <div style={styles.statNumber}>{user.surveysTaken}</div>
                    <div style={styles.statLabel}>Surveys Taken</div>
                </div>
                <div style={styles.statCard}>
                    <div style={styles.statIcon}>⭐</div>
                    <div style={styles.statNumber}>{user.totalScore}</div>
                    <div style={styles.statLabel}>Total Points</div>
                </div>
                <div style={styles.statCard}>
                    <div style={styles.statIcon}>📈</div>
                    <div style={styles.statNumber}>{user.averageScore}</div>
                    <div style={styles.statLabel}>Average Score</div>
                </div>
                <div style={styles.statCard}>
                    <div style={styles.statIcon}>🏆</div>
                    <div style={styles.statNumber}>{getUserRank()}</div>
                    <div style={styles.statLabel}>Global Rank</div>
                </div>
            </div>

            <div style={styles.content}>
                {/* Leaderboard */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>🏆 Global Leaderboard</h3>
                    <div style={styles.leaderboard}>
                        {leaderboard.slice(0, 5).map((player, index) => (
                            <div 
                                key={player.username}
                                style={{
                                    ...styles.leaderboardItem,
                                    ...(player.username === user.username ? styles.currentUser : {})
                                }}
                            >
                                <div style={styles.rank}>
                                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                                </div>
                                <div style={styles.playerName}>
                                    {player.username}
                                    {player.username === user.username && ' (You)'}
                                </div>
                                <div style={styles.playerStats}>
                                    <span style={styles.score}>{player.totalScore} pts</span>
                                    <span style={styles.avg}>{player.averageScore} avg</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Survey History */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>📋 Recent Surveys</h3>
                    {surveyHistory.length === 0 ? (
                        <div style={styles.noData}>No survey history yet</div>
                    ) : (
                        <div style={styles.historyList}>
                            {surveyHistory.slice(0, 5).map((survey, index) => (
                                <div key={survey._id} style={styles.historyItem}>
                                    <div style={styles.historyMain}>
                                        <div style={styles.historyDate}>
                                            {new Date(survey.createdAt).toLocaleDateString()}
                                        </div>
                                        <div style={styles.historyScore}>
                                            <span style={styles.scoreValue}>
                                                {survey.score} points
                                            </span>
                                            <span style={styles.correctAnswers}>
                                                ({survey.correctAnswers}/{survey.totalQuestions} correct)
                                            </span>
                                        </div>
                                    </div>
                                    <div style={styles.historyMeta}>
                                        <span style={styles.timeSpent}>
                                            ⏱️ {Math.floor(survey.timeSpent / 60)}m {survey.timeSpent % 60}s
                                        </span>
                                        <span style={styles.percentage}>
                                            {((survey.correctAnswers / survey.totalQuestions) * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
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
    },
    loading: {
        textAlign: 'center',
        padding: '2rem',
        fontSize: '1.2rem',
        color: '#7f8c8d',
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem',
    },
    statCard: {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '15px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        textAlign: 'center',
        transition: 'transform 0.3s ease',
    },
    statIcon: {
        fontSize: '2.5rem',
        marginBottom: '1rem',
    },
    statNumber: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: '0.5rem',
    },
    statLabel: {
        color: '#7f8c8d',
        fontSize: '0.9rem',
    },
    content: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
    },
    section: {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '15px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    },
    sectionTitle: {
        color: '#2c3e50',
        marginBottom: '1.5rem',
        fontSize: '1.3rem',
        borderBottom: '2px solid #ecf0f1',
        paddingBottom: '0.5rem',
    },
    leaderboard: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
    },
    leaderboardItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '1rem',
        borderRadius: '10px',
        backgroundColor: '#f8f9fa',
        transition: 'all 0.3s ease',
    },
    currentUser: {
        backgroundColor: '#e3f2fd',
        border: '2px solid #2196f3',
    },
    rank: {
        width: '40px',
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    playerName: {
        flex: 1,
        fontWeight: '600',
        color: '#34495e',
    },
    playerStats: {
        display: 'flex',
        gap: '1rem',
        fontSize: '0.9rem',
    },
    score: {
        color: '#27ae60',
        fontWeight: 'bold',
    },
    avg: {
        color: '#7f8c8d',
    },
    historyList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    historyItem: {
        padding: '1.5rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px',
        border: '1px solid #e9ecef',
    },
    historyMain: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.5rem',
    },
    historyDate: {
        color: '#7f8c8d',
        fontSize: '0.9rem',
    },
    historyScore: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    scoreValue: {
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    correctAnswers: {
        color: '#7f8c8d',
        fontSize: '0.9rem',
    },
    historyMeta: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    timeSpent: {
        color: '#7f8c8d',
        fontSize: '0.9rem',
    },
    percentage: {
        fontWeight: 'bold',
        color: '#27ae60',
    },
    noData: {
        textAlign: 'center',
        color: '#7f8c8d',
        padding: '2rem',
        fontStyle: 'italic',
    },
};

// Add hover effects
Object.assign(styles.statCard, {
    ':hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
    }
});

Object.assign(styles.leaderboardItem, {
    ':hover': {
        transform: 'translateX(5px)',
        backgroundColor: '#e9ecef',
    }
});

export default UserProfile;