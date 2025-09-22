const express = require('express');
const router = express.Router();
const { registerVolunteer, registerUser, loginVolunteer, loginUser, logout} = require('../controllers/authController');

// Volunteer routes
router.post('/volunteer/register', registerVolunteer);
router.post('/volunteer/login', loginVolunteer);

// User routes
router.post('/user/register', registerUser);
router.post('/user/login', loginUser);

//General logout route
router.get('/logout', logout);

module.exports = router;