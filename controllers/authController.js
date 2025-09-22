const Volunteer = require('../models/Volunteer');
const User = require('../models/User');


exports.registerVolunteer = async (req, res) => {
    try {
        const { name, email, password, gender } = req.body;
        let volunteer = await Volunteer.findOne({ email });

        if (volunteer) {
            return res.status(400).send('Volunteer already exists with that email.');
        }

        volunteer = await Volunteer.create({ name, email, password, gender });
        req.session.volunteerId = volunteer._id;
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.loginVolunteer = async (req, res) => {
    try {
        const { email, password } = req.body;
        const volunteer = await Volunteer.findOne({ email });

        if (volunteer && (await volunteer.matchPassword(password))) {
            req.session.volunteerId = volunteer._id;
            res.redirect('/dashboard');
        } else {
            res.status(401).send('Invalid email or password');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};


exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, gender } = req.body;
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).send('User with that email already exists.');
        }

        user = await User.create({ name, email, password, gender });
        req.session.userId = user._id;
        res.redirect('/user-dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            req.session.userId = user._id;
            res.redirect('/user-dashboard');
        } else {
            res.status(401).send('Invalid email or password');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};


exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Could not log out.');
        }
        res.redirect('/');
    });
};