'use strict';

var users = require('../controllers/users.controllers.js');

module.exports = usersRoutes;

//////////

function usersRoutes (app) {
  app.route('/api/users/signupphonenumber').post(users.signupPhoneNumber);
  app.route('/api/users/signupverifycode').post(users.signupVerifyCode);
}
