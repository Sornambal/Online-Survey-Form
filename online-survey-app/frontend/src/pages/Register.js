import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';

const Register = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        if (formData.password !== formData.confirmPassword) {
            setMessage('Passwords do not match');
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setMessage('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        try {
            const response = await authAPI.register({
                username: formData.username,
                email: formData.email,
                password: formData.password
            });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data));
            onLogin(response.data);
            navigate('/dashboard');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.cardHeader}>
                    <h2 style={styles.title}>Create Account 🎉</h2>
                    <p style={styles.subtitle}>Join thousands of users testing their knowledge</p>
                </div>

                {message && (
                    <div style={styles.message}>{message}</div>
                )}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="Choose a username"
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="Create a password (min. 6 characters)"
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="Confirm your password"
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        style={styles.button}
                    >
                        {loading ? (
                            <div style={styles.loading}>
                                <div style={styles.spinner}></div>
                                Creating Account...
                            </div>
                        ) : (
                            'Create Account'
                        )}
                    </button>
                </form>

                <div style={styles.footer}>
                    <p style={styles.footerText}>
                        Already have an account?{' '}
                        <Link to="/login" style={styles.link}>
                            Sign in here
                        </Link>
                    </p>
                </div>

                <div style={styles.features}>
                    <h4 style={styles.featuresTitle}>What you get:</h4>
                    <ul style={styles.featuresList}>
                        <li style={styles.featureItem}>🎯 Random 5-question surveys</li>
                        <li style={styles.featureItem}>📈 Progress tracking</li>
                        <li style={styles.featureItem}>🏆 Global leaderboard</li>
                        <li style={styles.featureItem}>⏱️ Timed challenges</li>
                    </ul>
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
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem',
    },
    card: {
        backgroundColor: 'white',
        padding: '3rem',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '450px',
    },
    cardHeader: {
        textAlign: 'center',
        marginBottom: '2rem',
    },
    title: {
        color: '#2c3e50',
        marginBottom: '0.5rem',
        fontSize: '2rem',
        fontWeight: 'bold',
    },
    subtitle: {
        color: '#7f8c8d',
        fontSize: '1rem',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    label: {
        color: '#34495e',
        fontWeight: '600',
        fontSize: '0.9rem',
    },
    input: {
        padding: '1rem',
        border: '2px solid #e9ecef',
        borderRadius: '10px',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.3s ease',
    },
    button: {
        padding: '1rem',
        backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        marginTop: '1rem',
    },
    message: {
        padding: '1rem',
        marginBottom: '1rem',
        borderRadius: '10px',
        backgroundColor: '#f8d7da',
        color: '#721c24',
        border: '1px solid #f5c6cb',
        textAlign: 'center',
    },
    footer: {
        textAlign: 'center',
        marginTop: '2rem',
        paddingTop: '1.5rem',
        borderTop: '1px solid #e9ecef',
    },
    footerText: {
        color: '#7f8c8d',
    },
    link: {
        color: '#667eea',
        fontWeight: '600',
        textDecoration: 'none',
    },
    features: {
        marginTop: '2rem',
        padding: '1.5rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px',
    },
    featuresTitle: {
        color: '#2c3e50',
        marginBottom: '1rem',
        fontSize: '1.1rem',
        fontWeight: '600',
    },
    featuresList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
    },
    featureItem: {
        padding: '0.5rem 0',
        color: '#5a6c7d',
    },
    loading: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
    },
    spinner: {
        width: '16px',
        height: '16px',
        border: '2px solid transparent',
        borderTop: '2px solid white',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    },
};

// Add focus and hover effects
Object.assign(styles.input, {
    ':focus': {
        borderColor: '#667eea',
    }
});

Object.assign(styles.button, {
    ':hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
    },
    ':disabled': {
        opacity: 0.7,
        cursor: 'not-allowed',
        transform: 'none',
    }
});

export default Register;