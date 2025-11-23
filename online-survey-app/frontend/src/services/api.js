import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
    baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authAPI = {
    login: (email, password) => api.post('/users/login', { email, password }),
    register: (userData) => api.post('/users/register', userData),
    getProfile: () => api.get('/users/profile'),
    getLeaderboard: () => api.get('/users/leaderboard'),
};

export const questionAPI = {
    getRandomQuestions: (count, category) => api.get(`/questions/random/${count}?category=${category}`),
    getCategories: () => api.get('/questions/categories'),
    getAllQuestions: () => api.get('/questions'),
    createQuestion: (questionData) => api.post('/questions', questionData),
};

export const surveyAPI = {
    startSurvey: (surveyData) => api.post('/surveys/start', surveyData),
    submitSurvey: (surveyData) => api.post('/surveys/submit', surveyData),
    getSurveyHistory: () => api.get('/surveys/history'),
};

export default api;