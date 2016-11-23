var app = require('../app');
var expect = require('chai').expect;
var should = require('chai').should();
var supertest = require('superTest');
var server = supertest.agent("http://localhost:3000");
var logger = require('../util/logger');


// TODO: make tests for the other CRUD routes
// DELETE, UPDATE, PUT, GET ONE

describe('AUTH', function () {
  
  it('should get all users in db', function (done) {
    server.get('/api/users')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + global.token)
      .expect(200)
      .end(function (err, res) {
        expect(res.body).to.be.an('array')
        expect(res.body).with.length(3)
        done();
      })
  });

  it('should get user info from JWT', function (done) {
    server.get('/api/users/me')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + global.token)
      .expect(200)
      .end(function (err, res) {
        (res.body).should.be.a('object');
        (res.body.email).should.equal('jimmylo@testing.com');
        (res.body.name).should.equal('Jimmy');
        (res.body.role).should.equal('user');
        should.not.exist(res.body.password);
        done();
      })
  });
});
// {
//   "_id": "5828d583d78acd2b8a160f00",
//   "updatedAt": "2016-11-13T21:05:07.363Z",
//   "createdAt": "2016-11-13T21:05:07.363Z",
//   "email": "jimmylo@testing.com",
//   "name": "Jimmy",
//   "__v": 0,
//   "role": "user",
//   "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODI4ZDU4M2Q3OGFjZDJiOGExNjBmMDAiLCJpYXQiOjE0Nzk4NTg2NTEsImV4cCI6MTQ4MDM4NDI1MX0.D68vEuLZhnF9GQx4tc7Hys-rWiyPpqtucDDdH13ew9s"
// }
