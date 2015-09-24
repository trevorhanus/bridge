'use strict';

var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var morgan = require('morgan');

var app = express();

app.use(morgan('dev'));

app.use(cors());

app.use(bodyParser.json());

require('../app/routes/core.routes.js')(app);
require('../app/routes/users.routes.js')(app);

module.exports = app;
