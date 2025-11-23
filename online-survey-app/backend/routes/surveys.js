const express = require('express');
const { startSurvey, submitSurvey, getSurveyHistory } = require('../controllers/surveyController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/start', auth, startSurvey);
router.post('/submit', auth, submitSurvey);
router.get('/history', auth, getSurveyHistory);

module.exports = router;