'use strict';

var twilio = require('./twilio.js');

var message = {
  to: '+15155202902',
  body: 'Hello, Trevor',
  callback: function (err, sms) {
    if (err) {
      console.log('Error in sending message: ', err);
    } else {
      console.log(sms);
    }
  }
};

twilio.sendSMS(message);
