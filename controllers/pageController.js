exports.renderHomepage = (req, res) => {
    res.render('homepage', {
        title: 'PureSentinal - Home'
    });
};

exports.renderHealthPage = (req, res) => {
    res.render('health', {
        title: 'Health Assessment - PureSentinal'
    });
};

exports.renderVolunteerPage = (req, res) => {
    res.render('volunteer', {
        title: 'Volunteer Sign-Up - PureSentinal'
    });
};

exports.renderLoginPage = (req, res) => {
    res.render('login', {
        title: 'Volunteer Login'
    });
};

exports.renderDashboard = (req, res) => {
    res.render('dashboard', { 
        title: 'Volunteer Dashboard'
    });
};

exports.renderUserDashboard = (req, res) => {
    res.render('userDashboard', {
        title: 'User Dashboard'
    });
};
