'use strict';

var db = require('./lib/db');

var dbName = process.env.DATABASE_DB || 'test1';

module.exports = db.query('CREATE DATABASE IF NOT EXISTS ' + dbName)
  .then(dropTable('TempPhoneNumber'))
  .then(createTempPhoneNumberTable)
  .then(createTempPhoneNumberIndex)
  .then(dropTable('Users'))
  .then(createUsersTable)
  //.then(done)
  .catch(error);

//////////

function createTempPhoneNumberIndex () {
  return db.query('CREATE INDEX phone_number_index ON TempPhoneNumber (PhoneNumber)');
}

function createTempPhoneNumberTable () {
  return db.query('CREATE TABLE TempPhoneNumber (' +
    'id INT NOT NULL AUTO_INCREMENT, ' +
    'PhoneNumber VARCHAR(10) NOT NULL UNIQUE, ' +
    'Code VARCHAR(10) NOT NULL, ' +
    'Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP, ' +
    'PRIMARY KEY (ID)' +
    ')');
}

function createUsersTable () {
  return db.query('CREATE TABLE Users (' +
    'id INT NOT NULL AUTO_INCREMENT, ' +
    'FirstName VARCHAR(255), ' +
    'LastName VARCHAR(255), ' +
    'PhoneNumber VARCHAR(10), ' +
    'Password VARCHAR(255), ' +
    'Status VARCHAR(20), ' +
    'Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP, ' +
    'PRIMARY KEY (ID)' +
    ')');
}

//function done () {
//  console.log('Finished Recreating the Database! :-D');
//  console.log('Go Enjoy the party!');
//  process.exit(0);
//}

function dropTable (table) {
  return function() {
    return db.query('DROP TABLE IF EXISTS ' + table);
  }
}

function error (err) {
  console.log('An error occurred.');
  console.error(err);
  //process.exit(1);
}
