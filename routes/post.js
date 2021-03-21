const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const passport = require('passport');


router.post('/create',postController.createpost);

module.exports = router;