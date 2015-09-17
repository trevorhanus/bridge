'use strict';

var expect = require('chai').expect;
var request = require('supertest');

var app = require('../lib/express.js');
var core = require('../app/controllers/core.controllers.js');

describe('Core Controllers', function () {

  it('should have a sayHello function', function () {
    expect(typeof core.sayHello).to.equal('function');
  });

  it('should send \'Hello', function (done) {
    request(app)
    .get('/')
    .expect(200)
    .end(function (err) {
      expect(err).to.equal(null);
      done();
    });
  });

});
