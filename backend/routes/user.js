const express = require('express');
const router = express.Router();
const controllersUser = require('../controllers/user');

router.post('/signup', controllersUser.signup);
router.post('/login', controllersUser.login);

module.exports = router;