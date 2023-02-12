const express = require('express');
const userController = require('../controllers/user.controller.js');
const {hasPermission} = require('../middlewares/acl.js');
const {isAuthorized} = require('../middlewares/auth');
const {validateDeposit} = require("../middlewares/validators/coin.validator.js");
const {validateCreateBody} = require("../middlewares/validators/user.validator.js");

const router = express.Router();

router.post('/', validateCreateBody, userController.createUser);
router.use(isAuthorized);
router.get('/', userController.getUser);
router.patch('/deposit', hasPermission('buyer'), validateDeposit, userController.updateDeposit);
router.patch('/reset-deposit', hasPermission('buyer'), userController.resetDeposit);

module.exports = router;