import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        onLogout();
        navigate('/');
    };

    return (
        <nav style={styles.navbar}>
            <div style={styles.navBrand}>
                <h2 style={styles.logo}>📊 SurveyMaster</h2>
            </div>
            <div style={styles.navItems}>
                {user && (
                    <>
                        <span style={styles.welcome}>
                            Welcome, <strong>{user.username}</strong>
                        </span>
                        <button 
                            onClick={() => navigate('/dashboard')}
                            style={styles.navButton}
                        >
                            Dashboard
                        </button>
                        <button 
                            onClick={() => navigate('/profile')}
                            style={styles.navButton}
                        >
                            Profile
                        </button>
                        <button 
                            onClick={handleLogout}
                            style={styles.logoutBtn}
                        >
                            Logout
                        </button>
                    </>
                )}
                {!user && (
                    <>
                        <button 
                            onClick={() => navigate('/login')}
                            style={styles.navButton}
                        >
                            Login
                        </button>
                        <button 
                            onClick={() => navigate('/register')}
                            style={styles.registerBtn}
                        >
                            Register
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
    },
    navBrand: {
        display: 'flex',
        alignItems: 'center',
    },
    logo: {
        margin: 0,
        fontSize: '1.8rem',
        fontWeight: 'bold',
        background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    navItems: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    welcome: {
        fontSize: '1rem',
        marginRight: '1rem',
    },
    navButton: {
        padding: '0.5rem 1rem',
        backgroundColor: 'transparent',
        color: 'white',
        border: '2px solid rgba(255,255,255,0.3)',
        borderRadius: '25px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    },
    logoutBtn: {
        padding: '0.5rem 1rem',
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        borderRadius: '25px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    },
    registerBtn: {
        padding: '0.5rem 1rem',
        backgroundColor: '#27ae60',
        color: 'white',
        border: 'none',
        borderRadius: '25px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    },
};

// Add hover effects
Object.assign(styles.navButton, {
    ':hover': {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderColor: 'rgba(255,255,255,0.5)',
    }
});

Object.assign(styles.logoutBtn, {
    ':hover': {
        backgroundColor: '#c0392b',
        transform: 'translateY(-2px)',
    }
});

Object.assign(styles.registerBtn, {
    ':hover': {
        backgroundColor: '#219a52',
        transform: 'translateY(-2px)',
    }
});

export default Navbar;