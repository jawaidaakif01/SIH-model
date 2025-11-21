require('dotenv').config();

process.env.MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sih_model';
process.env.SESSION_SECRET = process.env.SESSION_SECRET || 'dev_secret_change_me';
const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db');
const { loadTranslations } = require('./middleware/languageMiddleware');

connectDB();

const app = express();


app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI})
}))
app.use(loadTranslations);

app.use((req, res, next) => {
    res.locals.volunteer = req.session.volunteerId || null;
    res.locals.user = req.session.userId || null;
    next();
});

app.use((req, res, next) => {
    res.locals.volunteer = req.session.volunteerId;
    next();
})

app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/report', require('./routes/report'))
app.use('/report', require('./routes/report'));
app.use('/language', require('./routes/language'));

// proxy route for ML service (forwards to ML_URL or default http://127.0.0.1:5001/predict)
app.use('/api', require('./routes/mlProxy'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

