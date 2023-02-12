const passwordHash = require('password-hash');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        deposit: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        role: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    }, {
        timestamps: false,
        underscored: true,
    });
    User.beforeCreate(async (user, options) => {
        user.password = passwordHash.generate(user.password);
    });
    return User;
};