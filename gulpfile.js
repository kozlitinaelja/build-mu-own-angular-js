/**
 * Created by elnarakozlitina on 8/23/14.
 */
'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish'),
  karma = require('karma').server,
  gutil = require('gulp-util');

gulp.task('lint', function() {
  return gulp.src('./src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('test', function () {
  karma.start({
    browsers: ['PhantomJS'],
    files: ['src/**/*.js',
      'tests/**/*.spec.js'],
    frameworks: ['jasmine'],
    singleRun: true
  }, function (exitCode) {
    gutil.log('Karma has exited with ' + exitCode);
    process.exit(exitCode);
  });
});