const models = require("../models/index.js");

class SessionService {
    async countAllUserSessions(userId) {
        return models.Session.count({
            where: {userId}
        });
    }

    async removeAllUserSessions(userId) {
        return models.Session.destroy({
            where: {userId}
        });
    }

    async removeCurrentUserSession(token) {
        return models.Session.destroy({
            where: {token}
        });
    }

    async checkCurrentToken(userId, token) {
        return models.Session.findOne({
            where: {token, userId}
        });
    }

    async createSession(userId, token) {
        return models.Session.create({
            token, userId,
        });
    }
}

module.exports = new SessionService();