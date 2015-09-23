'use strict';

var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

var twilio = {};

twilio.sendSMS = function (to, message) {
  return new Promise(function (resolve, reject) {
    var msg = {
      to: to,
      from: process.env.TWILIO_FROM,
      body: message
    };

    client.sendMessage(msg, function (err, response) {
      if(err) {
        reject(err);
      } else {
        resolve(response);
      }
    })
  });
};

twilio.sendCode = function(user) {
  return twilio.sendSMS(user.PhoneNumber, user.code);
};

module.exports = twilio;
