const express = require('express');
const router = express.Router();
const { protect, protectUser } = require('../middleware/authMiddleware');

const {
    renderHomepage,
    renderHealthPage,
    renderVolunteerPage,
    renderLoginPage, 
    renderDashboard,
    renderUserDashboard
} = require('../controllers/pageController');

router.get('/', renderHomepage);
router.get('/health', renderHealthPage);
router.get('/volunteer', renderVolunteerPage);
router.get('/login', renderLoginPage); 
router.get('/dashboard', protect, renderDashboard);
router.get('/user-dashboard', renderUserDashboard);

router.get('/user-dashboard', protectUser, renderUserDashboard);

module.exports = router;