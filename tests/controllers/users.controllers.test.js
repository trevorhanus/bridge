'use strict';

var expect = require('chai').expect;
var request = require('supertest');

var app = require('../../lib/express.js');
var users = require('../../app/controllers/users.controllers.js');

describe('Users Controllers', function () {

  it('should have a signup controller', function () {
    expect(typeof users.signupPhoneNumber).to.equal('function');
  });

  it('should accept a phone number', function (done) {
    request(app)
      .post('/api/users/signupphonenumber')
      .send({PhoneNumber: '9705551234'})
      .expect(200)
      .end(function (err) {
        expect(err).to.equal(null);
        done();
      });
  });

  it('should accept the same phone number twice', function (done) {
    request(app)
      .post('/api/users/signupphonenumber')
      .send({PhoneNumber: '9705551234'})
      .expect(200)
      .end(function (err) {
        expect(err).to.equal(null);
        done();
      });
  });

});

