const express = require('express');
const userController = require('../controllers/userController');

let router = express.Router();

router.get('/', userController.getAllUser);
router.get('/add', userController.addUser);
router.get('/update', userController.updateUser);
router.get('/delete', userController.deleteUser);

module.exports = router;
