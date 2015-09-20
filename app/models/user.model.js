'use strict';

module.exports = function (db) {
  var Users = {};

  Users.getAll = function () {
    return db.query('SELECT * FROM Users');
  };

  Users.signupPhoneNumber = function (user) {
    return db.query('INSERT INTO TempPhoneNumber (PhoneNumber, Code) VALUES (' + user.PhoneNumber + ', ' + user.code + ')')
      .catch(function (err) {
        if (err.code !== 'ER_DUP_ENTRY') {
          throw err;
        }
      });
  };

  db.Users = Users;
};
