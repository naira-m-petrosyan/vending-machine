const httpStatus = require("http-status");
const userService = require("../services/user.service");

class UserController {
    async createUser(req, res, next) {
        try {
            await userService.create(req.body);
            return res.status(httpStatus.OK).json({});
        } catch (e) {
            return next(e);
        }
    }

    async getUser(req, res, next) {
        try {
            const user = await userService.getOne({id: req.user.id});
            return res.status(httpStatus.OK).json({user});
        } catch (e) {
            return next(e);
        }
    }

    async updateDeposit(req, res, next) {
        const {validCoins, invalidCoins} = req;
        try {
            const deposit = validCoins.reduce((acc, item) => acc + item, 0);
            await userService.update(req.user.id, {deposit: deposit + req.user.deposit});
            const response = {
                deposit: deposit + req.user.deposit
            };
            if(invalidCoins.length) {
                response.invalidCoins = invalidCoins;
            }
            return res.status(httpStatus.OK).json(response);
        } catch (e) {
            return next(e);
        }
    }

    async resetDeposit(req, res, next) {
        const {id, deposit } = req.user;
        try {
            const change = await userService.resetDeposit(id, deposit);
            return res.status(httpStatus.OK).json({change});
        } catch (e) {
            return next(e);
        }
    }
}

module.exports = new UserController();