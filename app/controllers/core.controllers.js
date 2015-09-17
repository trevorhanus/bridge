'use strict';

exports.sayHello = sayHello;

//////////

function sayHello (req, res) {
  res.send('Hello!');
}
