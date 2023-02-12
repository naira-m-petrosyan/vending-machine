const httpStatus = require("http-status");
const passwordHash = require("password-hash");
const userService = require("../services/user.service");
const jwtService = require("../services/jwt.service");
const sessionService = require("../services/session.service");
const ApiException = require("../utils/exception.js");

class SessionController {
    async logout(req, res, next) {
        const {userToken} = req;
        try {
            await sessionService.removeCurrentUserSession(userToken);
            throw new ApiException(401, 'UNAUTHORIZED');
        } catch (e) {
            return next(e);
        }
    }

    async logoutAll(req, res, next) {
        const {user} = req;
        try {
            await sessionService.removeAllUserSessions(user.id);
            throw new ApiException(401, 'UNAUTHORIZED');
        } catch (e) {
            return next(e);
        }
    }
}

module.exports = new SessionController();