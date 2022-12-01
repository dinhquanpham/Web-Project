const express = require('express');
const accountController = require('./AccountController');
let router = express.Router();

router.get('/cookie', accountController.checkCookie);
router.post('/updatePassword', accountController.updatePassword);
router.delete('/sign-out', accountController.signOut);

module.exports = router;