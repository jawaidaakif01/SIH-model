
const fs = require('fs');
const path = require('path');

const translations = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../translations.json'), 'utf-8')
);

exports.loadTranslations = (req, res, next) => {
    const lang = req.session.language || 'en';
    res.locals.t = translations[lang];
    res.locals.currentLang = lang;
    next();
};