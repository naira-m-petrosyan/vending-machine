require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const Sequelize = require('sequelize');
const httpStatus = require('http-status');
const config = require('./config/index.js');
const logger = require('./config/logger.js');
const ApiException = require('./src/utils/exception.js');
const router = require("./src/routes/index.js");

const app = express();

app.use(morgan('combined'))
// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());

app.use('/api', router);

app.use((req, res, next) => {
    next(new ApiException(httpStatus.NOT_FOUND, 'Not found'));
});



app.use((err, req, res, next) => {
    let error = err;
    if (!(error instanceof ApiException)) {
        const statusCode =
            error.statusCode || error instanceof Sequelize.ValidationError ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.name === 'SequelizeUniqueConstraintError' ? error.errors[0].message : error.message || httpStatus[statusCode];
        error = new ApiException(statusCode, message, error.errors);
    }
    next(error);
});

app.use((err, req, res, next) => {
    const {statusCode, message, errors} = err;
    const response = {
        code: statusCode,
        message,
        errors
    };
    if (config.env === 'development') {
        logger.error(err);
    }
    return res.status(statusCode).json(response);
});

const server = app.listen(config.port, () => {
    console.log(`Server running | Port: ${config.port}`);
});