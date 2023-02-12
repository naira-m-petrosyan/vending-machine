const ApiException = require("../utils/exception.js");
const httpStatus = require("http-status");
const productService = require("../services/product.service");


function hasPermission(role) {
    return async (req, res, next) => {
        try {
            const { user } = req;
            if(user.role === role) {
                return next();
            }
            throw new ApiException(httpStatus.FORBIDDEN, 'Permission denied');
        } catch (error) {
            return next(error);
        }
    };
}

async function isOwner(req, res, next) {
    try {
        const product = await productService.getOne({id: req.params.id});
        const { user } = req;
        if(user.id === product.sellerId) {
            return next();
        }
        throw new ApiException(httpStatus.FORBIDDEN, 'Permission denied');
    } catch (e) {
        return next(e);
    }
}

module.exports = {
    isOwner,
    hasPermission
}