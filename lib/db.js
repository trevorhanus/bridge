'use strict';

var mysql = require('mysql');
var Q = require('q');

var db = {};

db.connect = function () {
  db.connection.connect();
};

db.connection = mysql.createConnection({
  host: process.env.DATABASE_HOST || 'localhost',
  user: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || '',
  database: process.env.DATABASE_DB || 'test1'
});

db.disconnect = function () {
  db.connection.end();
};

db.query = Q.denodeify(db.connection.query);

require('../app/models/user.model.js')(db);

module.exports = db;