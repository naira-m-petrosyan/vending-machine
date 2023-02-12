const httpStatus = require("http-status");
const productService = require("../services/product.service");

class ProductController {
    async createProduct(req, res, next) {
        try {
            await productService.create(req.body, req.user.id);
            return res.status(httpStatus.OK).json({});
        } catch (e) {
            return next(e);
        }
    }

    async updateProduct(req, res, next) {
        try {
            await productService.update(req.params.id, req.body);
            return res.status(httpStatus.OK).json({});
        } catch (e) {
            return next(e);
        }
    }

    async getProduct(req, res, next) {
        try {
            const product = await productService.getOne({id: req.params.id});
            return res.status(httpStatus.OK).json({product});
        } catch (e) {
            return next(e);
        }
    }

    async getProducts(req, res, next) {
        const {role, id} = req.user;
        try {
            const query = {};
            if(role === 'seller') {
                query.sellerId = id;
            }
            const products = await productService.get(query);
            return res.status(httpStatus.OK).json({products});
        } catch (e) {
            return next(e);
        }
    }

    async deleteProduct(req, res, next) {
        try {
            const product = await productService.delete(req.params.id);
            return res.status(httpStatus.OK).json({});
        } catch (e) {
            return next(e);
        }
    }

    async buyProduct(req, res, next) {
        const {amount} = req.body;
        const {deposit, id} = req.user;
        try {
            const {product, change, total} = await productService.buy({productId: req.params.id, amount, deposit, userId: id});
            return res.status(httpStatus.OK).json({product, change, total, amount});
        } catch (e) {
            return next(e);
        }
    }
}

module.exports = new ProductController();