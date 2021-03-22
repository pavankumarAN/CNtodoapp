const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const passport = require('passport');


router.get('/comment',postController.comment);

router.post('/createpost',passport.checkAuthentication,postController.createpost);

module.exports = router;