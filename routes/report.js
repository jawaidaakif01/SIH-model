const express = require('express');
const router = express.Router();

const { createReport, getReport } = require('../controllers/reportController');

router.post('/submit', createReport);
router.get('/:id', getReport);

module.exports = router;