const passport = require('passport');
const Passport_local = require('passport-local').Strategy;
const USER = require('../models/user');


//Validating user
passport.use(new Passport_local({
    usernameField: 'email'
}, (email, password, done) => {
    USER.findOne({ email: email }, (err, user) => {
        if (err) {
            console.log(`No user found - ${err}`);
            return done(err);
        }
        if (!user || user.password !== password) {
            console.log(`Invalid Credentials`);
            return done(null, false);
        }
        return done(null, user);
    });
}));


//Serializing user
passport.serializeUser((user, done) => {
    return done(null, user.id);
});

//Deserializing user
passport.deserializeUser((id, done) => {
    USER.findById(id, (err, user) => {
        if (err) {
            console.log(`User is not found - ${err}`);
            return done(err);
        }
        return done(null, user);
    });
});

// User authentication
passport.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/users/signin');
}

//
passport.setAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;