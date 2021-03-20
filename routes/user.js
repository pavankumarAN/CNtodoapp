const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const passport = require('passport');

//User profile
router.get('/profile', passport.checkAuthentication, userController.profile);

//user signup
router.get('/signup', userController.signup);

//user signin
router.get('/signin', userController.signin);

//creating a user
router.post('/create', userController.create);

//establishing session
router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/users/signin' }
), userController.createSession);

module.exports = router;