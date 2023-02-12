const {validateIsEmpty} = require("../../utils/helper.js");
const ApiException = require("../../utils/exception.js");
const httpStatus = require("http-status");

const validateCreateBody = (req, res, next) => {
    const requiredFields = ['password', 'username', 'role'];
    const errors = {};
    requiredFields.forEach(item => {
        if (validateIsEmpty(req.body[item])) {
            errors[item] = `${item} is required.`;
        }
    });
    if(!['seller', 'buyer'].includes(req.body.role) && !errors.role) {
        errors.role = 'role has to be one of "seller" or "buyer"'
    }
    if(Object.keys(errors).length) {
        throw new ApiException(httpStatus.BAD_REQUEST, 'Validation Error', errors);
    }
    next();
}

module.exports = {
    validateCreateBody
}