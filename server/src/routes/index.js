const express = require('express');
const authRoute = require('./auth.js');
const userRoute = require('./user.js');
const productRoute = require('./product.js');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/product', productRoute);

module.exports = router;