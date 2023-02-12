const express = require('express');
const authRoute = require('./auth.js');
const userRoute = require('./user.js');
const productRoute = require('./product.js');
const sessionRoute = require('./session.js');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/product', productRoute);
router.use('/', sessionRoute);

module.exports = router;