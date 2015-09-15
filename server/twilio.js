'use strict';

var twilioConfig = require('./config/twilioConfig.js');
var client = require('twilio')(twilioConfig.live.accountSid, twilioConfig.live.authToken);

var twilio = {};

twilio.sendSMS = sendSMS;

module.exports = twilio;

//////////

function sendSMS (message) {
  client.sms.messages.create({
      body: message.body,
      to: message.to,
      from: '+15155235980'
  }, function(err, sms) {
      message.callback(err, sms);
  });
}
