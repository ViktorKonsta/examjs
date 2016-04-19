$ = do require "auto-require"

$.gulp.task "build:browser", ->
	$.gulp.src "src/index.coffee"
		.pipe do $.plumber
		.pipe do $.coffeeify
		.pipe $.rename "exam.js"
		.pipe $.gulp.dest "dist/plain/"

$.gulp.task "build:server", ->
	$.gulp.src "src/**/*.coffee"
		.pipe do $.plumber
		.pipe $.coffee bare: on
		.pipe $.gulp.dest "dist/module/"

$.gulp.task "build", ["build:browser", "build:server"]

$.gulp.task "test", ->
	$.gulp.src "test-src/**/*.coffee"
		.pipe do $.plumber
		.pipe $.coffee bare: on
		.pipe $.gulp.dest "test/"

$.gulp.task "watch", ->
	$.gulp.watch "src/**/*.coffee", ["build"]
	$.gulp.watch "test-src/**/*.coffee", ["test"]

$.gulp.task "default", ["build", "test", "watch"]