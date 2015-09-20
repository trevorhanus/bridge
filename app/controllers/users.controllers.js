'use strict';

var db = require('../../lib/db');

exports.signupPhoneNumber = signupPhoneNumber;

//////////

function send200 (req, res) {
  return function (data) {
    res.status(200).send(data);
  }
}

function send500 (req, res) {
  return function (err) {
    res.status(500).send(err);
  }
}

function signupPhoneNumber (req, res) {
  var user = {
    code: '1234',
    PhoneNumber: req.body.PhoneNumber
  };

  db.Users.signupPhoneNumber(user)
    .then(function (data) {
      if (data) {
        // send code
        // console.log('sending code: ', user.code);
      }
      return 'Success';
    })
    .then(send200(req, res))
    .catch(send500(req, res));
}
