var gulp = require('gulp')
var path = require('path')
var babel = require('gulp-babel')
var minifyCSS = require('gulp-minify-css')
var compass = require('gulp-compass')
var urlLoader = require('url-loader')
var gulpSequence = require('gulp-sequence').use(gulp)
var Transform = require('stream').Transform
var util = require('util')
var clean = require('gulp-clean')
var rename = require("gulp-rename")
gulp.task('watch', ['default'], function () {
	process.on('uncaughtException', function (err) {
		console.log('err.stack', err.stack)
	})
	gulp.watch('src/**/*.*', function (event) {
		if (/\.js$/.test(event.path)) {
			gulp
				.src(event.path, {
					base: path.join(__dirname, 'src')
				})
				.pipe(babel())
				.pipe(gulp.dest('lib'))
		} else if (/\.scss$/.test(event.path)) {
			gulp.run('scss')
		}
	})
})
gulp.task('scss', function (cb) {
	gulp
		.src('src/scss/amap-web-cms-ui.scss')
		.pipe(compass({
			config_file: './config.rb',
			sass: 'src/scss',
			css: 'dist'
		}))
		.pipe(gulp.dest('dist'))
		.on('finish', cb)
})
gulp.task('img2js', function () {
	gulp.src('src/**/*.png')
		.pipe(new Transform({
			objectMode: true,
			transform: function (file, enc, callback) {
				file.contents = new Buffer("module.exports = " + JSON.stringify("data:image/png;base64," + file.contents.toString('base64')))
				return callback(null, file)
			}
		}))
		.pipe(rename(function (path) {
			path.extname = ".js"
		}))
		.pipe(gulp.dest('lib'))
})
gulp.task('clean', function (cb) {
	gulp.src('{dist,lib}', {read: false})
		.pipe(clean({force: true}))
		.on('finish', cb)
})
gulp.task('default', function (cb) {
	gulpSequence('clean', 'img2js', 'scss', function () {
		var taskTotal = 2
		var taskDone = 0

		function checkTaskDone() {
			taskDone++
			if (taskDone === taskTotal) {
				cb()
			}
		}

		gulp
			.src('src/**/*.js')
			.pipe(babel())
			.pipe(gulp.dest('lib'))
			.on('finish', checkTaskDone)
		gulp
			.src('dist/**/*.css')
			.pipe(minifyCSS())
			.pipe(rename(function (path) {
				path.extname = '.min.css'
			}))
			.pipe(gulp.dest('dist'))
			.on('finish', checkTaskDone)
	})
})