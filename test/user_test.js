var app = require('../app');
var expect = require('chai').expect;
var should = require('chai').should();
var request = require('superTest');
var logger = require('../util/logger');


// TODO: make tests for the other CRUD routes
// DELETE, UPDATE, PUT, GET ONE

describe('USER', function () {
  
  it('should get all users in db', function (done) {
    request(app)
    .get('/api/users')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + global.token)
      .expect(200)
      .end(function (err, res) {
        should.not.exist(err);
        expect(res.body).to.be.an('array')
        expect(res.body).with.length(3)
        done();
      })
  });

  it('should get ALL user info from JWT', function (done) {
    request(app)
    .get('/api/users/me')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + global.token)
      .expect(200)
      .end(function (err, res) {
        should.not.exist(err);
        (res.body).should.be.a('object');
        (res.body.email).should.equal('jimmylo@testing.com');
        (res.body.name).should.equal('Jimmy');
        (res.body.role).should.equal('user');
        should.not.exist(res.body.password);
        done();
      })
  });
});
