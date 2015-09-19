'use strict';

var expect = require('chai').expect;
var sinon = require("sinon");

var db = require('../../lib/db.js');

describe('Database Handler', function () {

  beforeEach(function () {
    sinon.spy(db.connection, "connect");
    sinon.spy(db.connection, "end");
  });

  afterEach(function () {
    db.connection.connect.restore();
    db.connection.end.restore();
  });

  it('should be an object', function () {
    expect(typeof db).to.equal('object');
  });

  it('should have a connect function', function () {
    expect(typeof db.connect).to.equal('function');
  });

  it('should call connection.connect', function () {
    db.connect();
    expect(db.connection.connect.calledOnce).to.equal(true);
  });

  it('should have a disconnet function', function () {
    expect(typeof db.disconnect).to.equal('function');
  });

  it('should call connection.disconnect', function () {
    db.disconnect();
    expect(db.connection.end.calledOnce).to.equal(true);
  });

});
