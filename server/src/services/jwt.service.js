const jwt = require("jsonwebtoken");
const config = require("../../config/index.js");
const ApiException = require("../utils/exception.js");

class JWTService {
    createToken(payload) {
        return jwt.sign(payload, config.jwt.secret, {
            expiresIn: config.jwt.accessExpirationMinutes,
        })
    }
    async verifyToken(token) {
        try {
            return await jwt.verify(token, config.jwt.secret, {})
        } catch (e) {
            throw new ApiException(401, 'UNAUTHORIZED')
        }
    }
}

module.exports = new JWTService();