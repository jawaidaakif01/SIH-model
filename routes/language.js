const express = require('express');
const router = express.Router();

router.post('/set', (req, res) => {
    const { language } = req.body;
    if (language) {
        req.session.language = language; 
    }
    res.sendStatus(200);
});

module.exports = router;