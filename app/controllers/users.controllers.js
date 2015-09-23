'use strict';

var db = require('../../lib/db');
var twilio = require('../../lib/twilio');

exports.signupPhoneNumber = signupPhoneNumber;
exports.signupVerifyCode = signupVerifyCode;

//////////

function catchError (req, res) {
  return function (err) {
    if(err.code === 'ER_DUP_ENTRY') {
      res.status(409).send(err);
    } else {
      res.status(500).send(err);
    }
  }
}

function send200 (req, res) {
  return function (data) {
    res.status(200).send(data);
  }
}

function signupPhoneNumber (req, res) {
  var user = {
    code: Math.floor(Math.random() * 10000),
    PhoneNumber: req.body.PhoneNumber
  };

  db.Users.signupPhoneNumber(user)
    .then(function (data) {
      if (data) {
        return twilio.sendCode(user)
          .then(function () {
            return 'Success';
          });
      }
      return 'Success';
    })
    .then(send200(req, res))
    .catch(catchError(req, res));
}

function signupVerifyCode (req, res) {
  var user = {
    code: req.body.code,
    PhoneNumber: req.body.PhoneNumber
  };

  db.Users.verifyPhoneNumber(user)
    .then(function (data) {
      if(data === true) {
        return 'Success';
      } else {
        return 'Not Valid';
      }
    })
    .then(send200(req, res))
    .catch(catchError(req, res));
}
