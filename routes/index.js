const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.controller');

console.log(`router loaded`);

router.get('/', homeController.home);
router.post('/create-todo', homeController.createtodo);
router.get('/delete-todo', homeController.deletetodo);

module.exports = router;