const httpStatus = require("http-status");
const passwordHash = require("password-hash");
const userService = require("../services/user.service");
const jwtService = require("../services/jwt.service");
const sessionService = require("../services/session.service");
const ApiException = require("../utils/exception.js");

class AuthController {
    async login(req, res, next) {
        try {
            const user = await userService.getOne({username: req.body.username});
            if (!user || !passwordHash.verify(req.body.password, user.password)) {
                throw new ApiException(httpStatus.UNPROCESSABLE_ENTITY, 'Incorrect username or password');
            }
            delete user.dataValues.password;
            const token = await jwtService.createToken(user.dataValues);
            await sessionService.createSession(user.id, token);
            const activeSessions = await sessionService.countAllUserSessions(user.id);
            return res.status(httpStatus.OK).json({
                user,
                token,
                activeSessions,
            });
        } catch (e) {
            return next(e);
        }
    }
}

module.exports = new AuthController();