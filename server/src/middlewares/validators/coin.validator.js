const helpers = require("../../utils/helper.js");
const ApiException = require("../../utils/exception.js");
const httpStatus = require("http-status");

const validateDeposit = (req, res, next) => {
    const {coins} = req.body;
    if(!coins || !coins.length) {
        throw new ApiException(httpStatus.BAD_REQUEST, 'coins is required');
    }
    req.validCoins = [];
    req.invalidCoins = [];
    coins.forEach(coin => {
        if(helpers.coins.includes(coin)) {
            req.validCoins.push(coin);
        } else {
            req.invalidCoins.push(coin);
        }
    });
    if(req.validCoins.length) {
        return next();
    }
    throw new ApiException(httpStatus.BAD_REQUEST, 'Please insert valid coins');
}

module.exports = {
    validateDeposit
}