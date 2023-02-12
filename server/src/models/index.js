const Sequelize = require('sequelize');
const config = require('../../config/db.config.js');

const sequelize = new Sequelize(config.database, config.username, config.password, {
    dialect: config.dialect,
    pool: config.pool,
    host: config.host,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.model.js")(sequelize, Sequelize);
db.Product = require("./product.model.js")(sequelize, Sequelize);
db.Session = require("./session.model.js")(sequelize, Sequelize);

module.exports = db;