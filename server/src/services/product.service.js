const models = require("../models/index.js");
const {coins, getChange} = require("../utils/helper.js");
const ApiException = require("../utils/exception");
const userService = require("./user.service");
const httpStatus = require("http-status");

class ProductService {
    create(productDetails, sellerId) {
        return models.Product.create({...productDetails, sellerId});
    }

    getOne(productQuery) {
        return models.Product.findOne({where: productQuery});
    }

    get(query) {
        return models.Product.findAll({
            where: query
        });
    }

    update(id, updateObject) {
        return models.Product.update(updateObject, {where: {id}});
    }

    delete(id) {
        return models.Product.destroy({where: {id}});
    }

    async buy({productId, amount, deposit, userId}) {
        const product = await this.getOne({id: productId});
        if(product.amountAvailable < amount) {
            throw new ApiException(httpStatus.UNPROCESSABLE_ENTITY, `There are not ${amount} ${product.productName}${amount === 1 ? '':'s'} available on Vending Machine.`);
        }
        const total = product.cost * amount;
        if(total > deposit) {
            throw new ApiException(httpStatus.UNPROCESSABLE_ENTITY, `You do not have enough deposit to buy ${amount} ${product.productName}${amount === 1 ? '':'s'}`);
        }
        await this.update(productId, {amountAvailable: product.amountAvailable - amount});
        // I am not sure if we not to reset the deposit of the user here or no.
        await userService.update(userId, {deposit: deposit - total});
        const change = [];
        getChange(deposit - total, change, coins);
        return {change, product, total};
    }
}

module.exports = new ProductService();