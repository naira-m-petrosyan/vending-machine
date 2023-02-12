const express = require('express');
const authController = require('../controllers/auth.controller.js');
const {validateLoginBody} = require("../middlewares/validators/auth.validator");

const router = express.Router();

router.post('/login', validateLoginBody, authController.login);

module.exports = router;