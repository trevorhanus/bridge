'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var nodemon = require('gulp-nodemon');
var runSequence = require('run-sequence');

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

gulp.task('mocha', function () {
  return gulp.src('tests/**/*.js', {read: false})
  .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('test', function (done) {
  runSequence('mocha', done);
});
