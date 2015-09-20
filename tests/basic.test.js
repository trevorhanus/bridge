'use strict';

var expect = require('chai').expect;

describe('Basic Truth Test', function () {

  before(function (done) {
    require('../dbinit.js')
      .then(function () {
        done();
      })
      .catch(done);
  })

  it('should pass a basic truth test', function () {
    expect(true).to.equal(true);
  });
});
