module.exports = (sequelize, Sequelize) => {
  return sequelize.define("session", {
    token: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: sequelize.models.User,
        key: 'id'
      },
      allowNull: false,
    },
  }, {
    tableName: 'sessions',
    underscored: true,
    timestamps: false,
  });
};