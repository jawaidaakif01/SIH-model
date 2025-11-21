require('dotenv').config();
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

