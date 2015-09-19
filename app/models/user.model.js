'use strict';

module.exports = function (db) {
  var Users = {};

  Users.getAll = function () {
    return db.query('SELECT * FROM Users');
  };

  db.Users = Users;
};
