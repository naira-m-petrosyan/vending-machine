const express = require('express');
const sessionController = require('../controllers/session.controller');
const {isAuthorized} = require('../middlewares/auth');

const router = express.Router();

router.use(isAuthorized);
router.get('/logout', sessionController.logout);
router.get('/logout/all', sessionController.logoutAll);

module.exports = router;