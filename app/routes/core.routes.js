'use strict';

var core = require('../controllers/core.controllers.js');

module.exports = coreRoutes;

//////////

function coreRoutes (app) {
  app.route('/').get(core.sayHello);
}
