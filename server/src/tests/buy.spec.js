require('dotenv').config();
const index = require("../routes/product");

const request = require("supertest");
const express = require("express");
const {token, productSuccessBuy, productErrorBuy} = require("./mockData");
const app = express();

app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
app.use("/", index);

describe('POST /:id/buy', function() {
    it('responds with json', function(done) {
        request(app)
            .post(`/${productErrorBuy}/buy`)
            .set('Content-Type', 'application/json')
            .auth(token, { type: 'bearer' })
            .expect(400, done)
    });
});

describe('POST /:id/buy', function() {
    it('responds with json', function(done) {
        request(app)
            .post(`/${productErrorBuy}/buy`)
            .send({amount: 0})
            .set('Content-Type', 'application/json')
            .auth(token, { type: 'bearer' })
            .expect(400, done)
    });
});

describe('POST /:id/buy', function() {
    it('responds with json', function(done) {
        request(app)
            .post(`/${productErrorBuy}/buy`)
            .send({amount: 5})
            .set('Content-Type', 'application/json')
            .auth(token, { type: 'bearer' })
            .expect(422, done)
    });
});

describe('POST /:id/buy', function() {
    it('responds with json', function(done) {
        request(app)
            .post(`/${productSuccessBuy}/buy`)
            .send({amount: 5})
            .set('Content-Type', 'application/json')
            .auth(token, { type: 'bearer' })
            .expect(200, done)
    });
});