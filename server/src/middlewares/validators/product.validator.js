const {validateIsEmpty} = require("../../utils/helper.js");
const ApiException = require("../../utils/exception.js");
const httpStatus = require("http-status");

const validateCreateOrUpdateBody = (req, res, next) => {
    const {cost, amountAvailable} = req.body;
    const requiredFields = ['productName', 'cost', 'amountAvailable'];
    const errors = {};
    requiredFields.forEach(item => {
        if (validateIsEmpty(req.body[item])) {
            errors[item] = `${item} is required.`;
        }
    });
    if((!Number.isInteger(cost) || cost <= 0) && !errors.cost) {
        errors.cost = 'cost has to be a positive integer'
    }
    if((!Number.isInteger(amountAvailable) || amountAvailable < 0) && !errors.amountAvailable) {
        errors.amountAvailable = 'amountAvailable has to be a positive integer or 0'
    }
    if(Object.keys(errors).length) {
        throw new ApiException(httpStatus.BAD_REQUEST, 'Validation Error', errors);
    }
    next();
}

const validateBuyBody = (req, res, next) => {
    const {amount} = req.body;
    const requiredFields = ['amount'];
    const errors = {};
    requiredFields.forEach(item => {
        if (validateIsEmpty(req.body[item])) {
            errors[item] = `${item} is required.`;
        }
    });
    if((!Number.isInteger(amount) || amount <= 0) && !errors.amount) {
        errors.cost = 'amount has to be a positive integer'
    }
    if(Object.keys(errors).length) {
        throw new ApiException(httpStatus.BAD_REQUEST, 'Validation Error', errors);
    }
    next();
}

module.exports = {
    validateCreateOrUpdateBody,
    validateBuyBody,
}