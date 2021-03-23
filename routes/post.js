const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const passport = require('passport');


router.get('/allposts', postController.allposts);

router.post('/createpost', passport.checkAuthentication, postController.createpost);

router.get('/destroypost', passport.checkAuthentication, postController.destroyPost);

module.exports = router;