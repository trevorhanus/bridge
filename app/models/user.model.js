'use strict';

var bcrypt = require('bcryptjs');

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

  Users.signup = function (user) {
    var salt = bcrypt.genSaltSync(10);

    var sql = 'INSERT INTO Users (FirstName, LastName, Email, PhoneNumber, Password, Salt) VALUES (' +
      '\'' + user.FirstName + '\', ' +
      '\'' + user.LastName + '\', ' +
      '\'' + user.Email + '\', ' +
      '\'' + user.PhoneNumber + '\', ' +
      '\'' + bcrypt.hashSync(user.Password, salt) + '\', ' +
      '\'' + salt + '\'' +
      ')';

    console.log(sql);

    return db.query(sql)
      .then(function () {
        return true;
      })
      .catch(function (error) {
        throw error;
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
