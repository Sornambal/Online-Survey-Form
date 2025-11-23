import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './components/UserProfile';
import { authAPI } from './services/api';
import './App.css';

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');

        if (token && savedUser) {
            setUser(JSON.parse(savedUser));
            validateToken();
        } else {
            setLoading(false);
        }
    }, []);

    const validateToken = async () => {
        try {
            await authAPI.getProfile();
        } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.spinner}></div>
                <div style={styles.loadingText}>Loading SurveyMaster...</div>
            </div>
        );
    }

    return (
        <Router>
            <div className="App">
                <Navbar user={user} onLogout={handleLogout} />
                <main style={styles.main}>
                    <Routes>
                        <Route path="/" element={<Home user={user} />} />
                        <Route 
                            path="/login" 
                            element={
                                !user ? (
                                    <Login onLogin={handleLogin} />
                                ) : (
                                    <Navigate to="/dashboard" replace />
                                )
                            } 
                        />
                        <Route 
                            path="/register" 
                            element={
                                !user ? (
                                    <Register onLogin={handleLogin} />
                                ) : (
                                    <Navigate to="/dashboard" replace />
                                )
                            } 
                        />
                        <Route 
                            path="/dashboard" 
                            element={
                                user ? (
                                    <Dashboard user={user} />
                                ) : (
                                    <Navigate to="/login" replace />
                                )
                            } 
                        />
                        <Route 
                            path="/profile" 
                            element={
                                user ? (
                                    <UserProfile user={user} />
                                ) : (
                                    <Navigate to="/login" replace />
                                )
                            } 
                        />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

const styles = {
    main: {
        minHeight: 'calc(100vh - 80px)',
    },
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
    },
    spinner: {
        width: '50px',
        height: '50px',
        border: '4px solid rgba(255,255,255,0.3)',
        borderTop: '4px solid white',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '1rem',
    },
    loadingText: {
        fontSize: '1.2rem',
        fontWeight: '600',
    },
};

export default App;