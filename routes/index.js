const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.controller');


console.log(`router loaded`);
// Home page for creating and deleting a todo
router.get('/', homeController.home);
// creating a todo
router.post('/create-todo', homeController.createtodo);
// deleting a todo
router.get('/delete-todo', homeController.deletetodo);

router.use('/users', require('./user'));
router.use('/post', require('./post'));
router.use('/comments', require('./comment'));

module.exports = router;