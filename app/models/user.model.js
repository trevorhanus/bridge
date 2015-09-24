'use strict';

module.exports = function (db) {
  var Users = {};

  Users.getAll = function () {
    return db.query('SELECT * FROM Users');
  };

  Users.phoneIsUnique = function (phoneNumber) {
    return db.query('SELECT COUNT(PhoneNumber) FROM Users WHERE PhoneNumber=\'' + phoneNumber + '\'')
      .then(function (data) {
        return data[0]['COUNT(PhoneNumber)'];
      });
  };

  Users.signupPhoneNumber = function (user) {
    return Users.phoneIsUnique(user.PhoneNumber)
      .then(function (count) {
        if(count > 0) {
          throw {code: 'ER_DUP_ENTRY'};
        } else {
          return db.query('INSERT INTO TempPhoneNumber (PhoneNumber, Code) VALUES (' + user.PhoneNumber + ', ' + user.code + ')')
            .catch(function (err) {
              if (err.code !== 'ER_DUP_ENTRY') {
                throw err;
              }
            });
        }
      });

  };

  Users.verifyPhoneNumber = function (user) {
    return db.query('SELECT * FROM TempPhoneNumber WHERE PhoneNumber=\'' + user.PhoneNumber + '\'')
      .then(function (rows) {
        if(rows.length > 0 && rows[0].code === user.code) {
          return true;
        } else {
          return false;
        }
      });
  };

  db.Users = Users;
};
