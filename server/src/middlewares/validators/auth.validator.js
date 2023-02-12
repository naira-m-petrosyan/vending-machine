const {validateIsEmpty} = require("../../utils/helper.js");
const ApiException = require("../../utils/exception.js");
const httpStatus = require("http-status");

const validateLoginBody = (req, res, next) => {
    const requiredFields = ['password', 'username'];
    const errors = {};
    requiredFields.forEach(item => {
        if (validateIsEmpty(req.body[item])) {
            errors[item] = `${item} is required.`;
        }
    });
    if(Object.keys(errors).length) {
        throw new ApiException(httpStatus.BAD_REQUEST, 'Validation Error', errors);
    }
    next();
}

module.exports = {
    validateLoginBody
}