const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

//user signup
router.get('/signup', userController.signup);

//user signin
router.get('/signin', userController.signin);

router.post('/create', userController.create);

module.exports = router;