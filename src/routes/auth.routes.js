const express = require('express');
const AuthController = require('../controller/auth.controller');

const router = express.Router();
const controller = new AuthController();

router.post('/login', controller.login.bind(controller));

module.exports = router;