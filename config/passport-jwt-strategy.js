const passport = require('passport');
const Passport_JWT = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const USER = require('../models/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey: 'codeial'
}

passport.use(new Passport_JWT(opts, (jwtPayLoad, done) => {
    USER.findById(jwtPayLoad._id, (err, user) => {
        if (err) {
            console.log(`Error in finding user from JWT - ${err}`);
            return;
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

module.exports = passport;