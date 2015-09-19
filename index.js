'use strict';

var app = require('./lib/express');
var db = require('./lib/db');

db.connect();

app.listen(3000, function () {
  console.log('The party is on 3000');
});
