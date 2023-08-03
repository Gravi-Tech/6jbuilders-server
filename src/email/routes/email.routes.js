const express = require('express');
const router = express.Router();
const EmailController = require('../../email/controller/email.controller');

router.get('/verify/:token', EmailController.verifyEmail);

module.exports = router;
