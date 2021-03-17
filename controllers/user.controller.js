const User = require('../models/user');
const USER = require('../models/user');

module.exports.signup = (req, res) => {
    return res.render('signup', {
        title: 'Sign-Up'
    });
};

module.exports.signin = (req, res) => {
    return res.render('signin', {
        title: 'Sign-In'
    });
};

module.exports.create = (req, res) => {
    if (req.body.password !== req.body.confirm_password) {
        return res.redirect('back');
    }

    USER.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            console.log(`User is not yet created - ${err}`);
            return;
        }
        if (!user) {
            USER.create(req.body, (err, user) => {
                if (err) {
                    console.log(`Error in creating user ${err}`);
                    return;
                }
                return res.redirect('/users/signin');
            });
        } else {
            return res.redirect('back');
        }
    });
};

module.exports.createSession = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            console.log(`User is not found - ${err}`);
            return;
        }
        if (user) {
            if (req.body.password !== user.password) {
                console.log(`Password not matched`);
                return res.redirect('/users/signin');
            }else {
                res.cookie(user._id);
                return res.redirect('/');
            }
        } else {
            console.log(`User not found`);
            return res.redirect('/users/signup');
        }
    });
};