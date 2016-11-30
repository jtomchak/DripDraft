var app = require('../app');
var expect = require('chai').expect;
var should = require('chai').should();
var request = require('superTest');
var logger = require('../util/logger');


describe('AUTH', function () {
        it('should be able to sign up for new account', function(done) {
        request(app)
            .post('/auth/signup')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .type('form')
            .send({
               email:'banana@draft.io',
               password: 'randomWords'
            })
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                const payload = res.body;
                // should.exist(payload.accessToken);
                // (payload).should.be.a('object'); 
                done();
            })
    });

});