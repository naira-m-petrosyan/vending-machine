module.exports = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    dialect: "postgres",
    seederStorage: 'sequelize',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};