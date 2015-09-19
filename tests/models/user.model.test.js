'use strict';

var expect = require('chai').expect;
var sinon = require("sinon");

var db = require('../../lib/db');

describe('User Model', function () {

  it('should export a function', function () {
    expect(typeof db.Users).to.equal('object');
  });

  it('should query the database', function () {
    var mock = sinon.mock(db);
    mock.expects("query").once();

    db.Users.getAll();

    mock.verify();
  });

});
