const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');


router.get('/comment',postController.comment);

router.post('/createpost',postController.createpost);

module.exports = router;