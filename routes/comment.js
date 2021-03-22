const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');
const passport = require('passport');


// router.get('/comment', postController.comment);

router.post('/create', passport.checkAuthentication, commentController.create);

module.exports = router;