const {getTokenFromHeader} = require("../utils/helper.js");
const userService = require("../services/user.service");
const jwtService = require("../services/jwt.service");
const ApiException = require("../utils/exception.js");
const httpStatus = require("http-status");

async function isAuthorized(req, res, next) {
    try {
        const tokenHeader = req.get('authorization');
        if (!tokenHeader) {
            req.user = null;
            throw new ApiException(httpStatus.UNAUTHORIZED, 'Unauthorized');
        } else {
            const token = getTokenFromHeader(tokenHeader);
            const payload = await jwtService.verifyToken(token);
            if (payload) {
                const user = await userService.getOne({id: payload.id});
                if (user) {
                    req.user = user;
                    return next();
                }
            }
            req.user = null;
            throw new ApiException(httpStatus.UNAUTHORIZED, 'Unauthorized');
        }
    } catch (e) {
        return next(e);
    }
}

module.exports = {
    isAuthorized
}