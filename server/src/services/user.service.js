const models = require("../models/index.js");
const {coins, getChange} = require("../utils/helper.js");

class UserService {
    create(userDetails) {
        return models.User.create(userDetails);
    }

    getOne(userDetails) {
        return models.User.findOne({where: userDetails});
    }

    update(id, updateObject) {
        console.log(models);
        return models.User.update(updateObject, {where: {id}});
    }

    async resetDeposit(id, deposit) {
        const change = [];
        getChange(deposit, change, coins);
        await this.update(id, {
            deposit: 0
        });
        return change;
    }
}

module.exports = new UserService();