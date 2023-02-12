require('dotenv').config();
const index = require("../routes/user");

const request = require("supertest");
const express = require("express");
const {token} = require("./mockData");
const app = express();

app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
app.use("/", index);

describe('PATCH /deposit', function() {
    it('responds with json', function(done) {
        request(app)
            .patch('/deposit')
            .set('Content-Type', 'application/json')
            .auth(token, { type: 'bearer' })
            .expect(400, done)
    });
});

describe('PATCH /deposit', function() {
    it('responds with json', function(done) {
        request(app)
            .patch('/deposit')
            .set('Content-Type', 'application/json')
            .auth(token, { type: 'bearer' })
            .send({})
            .expect(400, done)
    });
});

describe('PATCH /deposit', function() {
    it('responds with json', function(done) {
        request(app)
            .patch('/deposit')
            .send({"coins": [1, 3]})
            .set('Content-Type', 'application/json')
            .auth(token, { type: 'bearer' })
            .expect(400, done)
    });
});

describe('PATCH /deposit', function() {
    it('responds with json', function(done) {
        request(app)
            .patch('/deposit')
            .send({"coins": [1, 20, 20]})
            .set('Content-Type', 'application/json')
            .auth(token, { type: 'bearer' })
            .expect(200, done)
        });
    });