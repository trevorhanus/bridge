'use strict';

var coveralls = require('gulp-coveralls');
var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var nodemon = require('gulp-nodemon');
var runSequence = require('run-sequence');

gulp.task('coveralls', function () {
  return gulp.src(['coverage/**/lcov.info'])
  .pipe(coveralls());
});

gulp.task('default', ['nodemon']);

gulp.task('nodemon', function () {
  nodemon({
    script: 'index.js',
    ext: 'js'
  })
  .on('restart', function () {
    console.log('Restarting the party.......!!');
  });

});

gulp.task('mocha', function (cb) {
  gulp.src(['app/**/*.js', 'lib/**/*.js'])
  .pipe(istanbul({
    includeUntested: true
  })) // Covering files
  .pipe(istanbul.hookRequire()) // Force `require` to return covered files
  .on('finish', function () {
    gulp.src(['tests/**/*.js'], {read: false})
    .pipe(mocha({reporter: 'spec'}))
    .pipe(istanbul.writeReports()) // Creating the reports after tests ran
    //.pipe(istanbul.enforceThresholds({thresholds: {global: 100}})) // Enforce a coverage of at least 100%
    .on('end', cb);
  });
});

gulp.task('test', function (done) {
  runSequence('mocha', done);
});
