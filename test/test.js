var app = require('../app');
var expect = require('chai').expect;
var request = require('superTest');


// TODO: make tests for the other CRUD routes
// DELETE, UPDATE, PUT, GET ONE

describe('[USERS]', function(){

  it('should get all users', function(done) {
    request(app)
      .get('/api/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('array');
        done();
      })
  });
});
