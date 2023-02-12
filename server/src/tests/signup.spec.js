require('dotenv').config();
const index = require("../routes/user");

const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
app.use("/", index);

describe('POST /', function() {
    it('responds with json', function(done) {
        request(app)
            .post('/')
            .set('Content-Type', 'application/json')
            .expect(400, done)
    });
});

describe('POST /', function() {
    it('responds with json', function(done) {
        request(app)
            .post('/')
            .send({
                username: 'username',
                password: '123456'
            })
            .set('Content-Type', 'application/json')
            .expect(400, done)
    });
});

describe('POST /', function() {
    it('responds with json', function(done) {
        request(app)
            .post('/')
            .send({
                username: 'buyer',
                role: 'admin',
                password: '123456'
            })
            .set('Content-Type', 'application/json')
            .expect(400, done)
    });
});

describe('POST /', function() {
    it('responds with json', function(done) {
        request(app)
            .post('/')
            .send({
                username: 'seller',
                role: 'seller',
                password: '123456'
            })
            .set('Content-Type', 'application/json')
            .expect(500, done)
    });
});

// describe('POST /', function() {
//     it('responds with json', function(done) {
//         request(app)
//             .post('/')
//             .send({
//                 username: 'seller-new1',
//                 role: 'seller',
//                 password: '123456'
//             })
//             .set('Content-Type', 'application/json')
//             .expect(200, done)
//     });
// });