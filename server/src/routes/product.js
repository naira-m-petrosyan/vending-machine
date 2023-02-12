const express = require('express');
const productController = require('../controllers/product.controller.js');
const {hasPermission, isOwner} = require('../middlewares/acl.js');
const {validateCreateOrUpdateBody, validateBuyBody} = require("../middlewares/validators/product.validator");
const {isAuthorized} = require("../middlewares/auth");

const router = express.Router();

router.use(isAuthorized);
router.get('/', productController.getProducts);
router.post('/:id/buy', hasPermission('buyer'), validateBuyBody, productController.buyProduct);
router.use(hasPermission('seller'));
router.post('/', validateCreateOrUpdateBody, productController.createProduct);
router.get('/:id', isOwner, productController.getProduct);
router.put('/:id', validateCreateOrUpdateBody, isOwner, productController.updateProduct);
router.delete('/:id',isOwner, productController.deleteProduct);

module.exports = router;