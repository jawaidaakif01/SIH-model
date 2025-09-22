exports.protect = (req, res, next) => {
    if (req.session.volunteerId){
        next();
    }else{
        res.redirect('/login');
    }
}

exports.protectUser = (req, res, next) => {
    if (req.session.userId) return next();
    res.redirect('/health')
}