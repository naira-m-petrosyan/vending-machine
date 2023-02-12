require('dotenv').config({
    path: './.env'
});

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.SERVER_PORT,
    mongoose: {
        url: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
        options: {
            user: process.env.DB_USERNAME,
            pass: process.env.DB_PASSWORD,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
    },
};