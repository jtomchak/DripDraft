var app = require('../app');
var expect = require('chai').expect;
var request = require('superTest');
var logger = require('../util/logger');


global.token = null;
before(function (done) {
    logger.log('Global Setup')
    logger.log('JWT Setup...')
    request(app)
    .post('/auth/signin')
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


