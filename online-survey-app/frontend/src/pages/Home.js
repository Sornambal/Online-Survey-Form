import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ user }) => {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            {/* Hero Section */}
            <section style={styles.hero}>
                <div style={styles.heroContent}>
                    <h1 style={styles.heroTitle}>
                        Welcome to <span style={styles.highlight}>SurveyMaster</span>
                    </h1>
                    <p style={styles.heroSubtitle}>
                        Test your knowledge with our interactive surveys. Answer random questions from various categories and track your progress!
                    </p>
                    <div style={styles.heroButtons}>
                        {!user ? (
                            <>
                                <button 
                                    onClick={() => navigate('/register')}
                                    style={styles.primaryButton}
                                >
                                    Get Started
                                </button>
                                <button 
                                    onClick={() => navigate('/login')}
                                    style={styles.secondaryButton}
                                >
                                    Sign In
                                </button>
                            </>
                        ) : (
                            <>
                                <button 
                                    onClick={() => navigate('/dashboard')}
                                    style={styles.primaryButton}
                                >
                                    Start Survey
                                </button>
                                <button 
                                    onClick={() => navigate('/profile')}
                                    style={styles.secondaryButton}
                                >
                                    View Profile
                                </button>
                            </>
                        )}
                    </div>
                </div>
                <div style={styles.heroImage}>
                    <div style={styles.imagePlaceholder}>
                        📊🎯📝
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section style={styles.features}>
                <h2 style={styles.featuresTitle}>Why Choose SurveyMaster?</h2>
                <div style={styles.featuresGrid}>
                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>🎯</div>
                        <h3 style={styles.featureTitle}>Random Questions</h3>
                        <p style={styles.featureDescription}>
                            Get 5 random questions from various categories every time you take a survey.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section style={styles.stats}>
                <div style={styles.statsGrid}>
                    <div style={styles.stat}>
                        <div style={styles.statNumber}>1000+</div>
                        <div style={styles.statLabel}>Questions</div>
                    </div>
                    <div style={styles.stat}>
                        <div style={styles.statNumber}>50+</div>
                        <div style={styles.statLabel}>Categories</div>
                    </div>
                    <div style={styles.stat}>
                        <div style={styles.statNumber}>5000+</div>
                        <div style={styles.statLabel}>Surveys Taken</div>
                    </div>
                    <div style={styles.stat}>
                        <div style={styles.statNumber}>100+</div>
                        <div style={styles.statLabel}>Active Users</div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    hero: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '4rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        color: 'white',
    },
    heroContent: {
        flex: 1,
        maxWidth: '600px',
    },
    heroTitle: {
        fontSize: '3.5rem',
        fontWeight: 'bold',
        marginBottom: '1.5rem',
        lineHeight: '1.2',
    },
    highlight: {
        background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    heroSubtitle: {
        fontSize: '1.3rem',
        marginBottom: '2.5rem',
        opacity: 0.9,
        lineHeight: '1.6',
    },
    heroButtons: {
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
    },
    primaryButton: {
        padding: '1rem 2rem',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        backgroundColor: '#ff6b6b',
        color: 'white',
        border: 'none',
        borderRadius: '25px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
    },
    secondaryButton: {
        padding: '1rem 2rem',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        color: 'white',
        border: '2px solid rgba(255,255,255,0.3)',
        borderRadius: '25px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    },
    heroImage: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePlaceholder: {
        fontSize: '8rem',
        opacity: 0.8,
    },
    features: {
        padding: '5rem 2rem',
        backgroundColor: 'white',
    },
    featuresTitle: {
        textAlign: 'center',
        fontSize: '2.5rem',
        color: '#2c3e50',
        marginBottom: '3rem',
        fontWeight: 'bold',
    },
    featuresGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    featureCard: {
        padding: '2.5rem 2rem',
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: '20px',
        transition: 'all 0.3s ease',
        border: '1px solid #e9ecef',
    },
    featureIcon: {
        fontSize: '3rem',
        marginBottom: '1.5rem',
    },
    featureTitle: {
        fontSize: '1.5rem',
        color: '#2c3e50',
        marginBottom: '1rem',
        fontWeight: '600',
    },
    featureDescription: {
        color: '#7f8c8d',
        lineHeight: '1.6',
    },
    stats: {
        padding: '4rem 2rem',
        backgroundColor: '#2c3e50',
        color: 'white',
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '3rem',
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center',
    },
    stat: {
        padding: '2rem',
    },
    statNumber: {
        fontSize: '3rem',
        fontWeight: 'bold',
        marginBottom: '0.5rem',
        color: '#ff6b6b',
    },
    statLabel: {
        fontSize: '1.2rem',
        opacity: 0.8,
    },
};

// Add hover effects
Object.assign(styles.primaryButton, {
    ':hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
        backgroundColor: '#ff5252',
    }
});

Object.assign(styles.secondaryButton, {
    ':hover': {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderColor: 'rgba(255,255,255,0.5)',
        transform: 'translateY(-3px)',
    }
});

Object.assign(styles.featureCard, {
    ':hover': {
        transform: 'translateY(-10px)',
        boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
        backgroundColor: 'white',
    }
});

export default Home;