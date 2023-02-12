module.exports = (sequelize, Sequelize) => {
    return sequelize.define("product", {
        amountAvailable: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        cost: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        productName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        sellerId: {
            type: Sequelize.INTEGER,
            references: {
                model: sequelize.models.User,
                key: 'id'
            },
            allowNull: false,
        },
    }, {
        tableName: 'products',
        underscored: true,
        timestamps: false,
    });
};