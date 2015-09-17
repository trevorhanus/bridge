'use strict';

var express = require('express');

var app = express();

require('../app/routes/core.routes.js')(app);

module.exports = app;
