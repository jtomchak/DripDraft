var app = require('../app');
var expect = require('chai').expect;
var supertest = require('superTest');
var logger = require('../util/logger');
var server = supertest.agent("http://localhost:3000");


global.token = null;
before(function (done) {
    logger.log('Global Setup')
    logger.log('JWT Setup...')
    server.post('/auth/signin')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .type('form')
        .send({ email: 'Jimmylo@testing.com', password: 'test' })
        .expect(200)
        .end(function (err, res) {
            expect(res.body).to.be.an('Object');
            global.token = res.body.accessToken
            logger.log("*****Token Success******")
            done();
        })
});

after(function (done) {
    logger.log("Global Teardown");
    done();
});


