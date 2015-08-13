gulp = require 'gulp'
uglify = require 'gulp-uglify'
coffee = require 'gulp-coffee'
rename = require 'gulp-rename'
plumber = require 'gulp-plumber'
watch = require 'gulp-watch'
size = require 'gulp-size'
browserSync = require('browser-sync').create()

gulp.task 'server', ->
	browserSync.init server: baseDir: './test'

gulp.task 'build', ->
	gulp.src 'sources/exam.coffee'
		.pipe do plumber
		.pipe coffee bare: true
		.pipe gulp.dest 'dist/'
		.pipe gulp.dest 'test/'
		.pipe do size
		.pipe do uglify
		.pipe rename 'exam.min.js'
		.pipe gulp.dest 'dist/'
		.pipe do size
		.pipe do browserSync.stream

gulp.task 'watch', ->
	watch 'sources/**/*.coffee', ->
		gulp.start 'build'

gulp.task 'default', ['server', 'watch', 'build']