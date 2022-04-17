const { src, dest, watch, series, parallel } = require('gulp')
const pug = require( 'gulp-pug' )
const stylus = require('gulp-stylus')
const browserSync = require('browser-sync')

const srcPug = ['src/**/*.pug', '!src/**/_*.pug']
const srcStylus = 'src/css/**/*.styl'

const watchTasks = () => {
    watch(srcPug, taskPug)
    watch(srcPug, taskBsReload)
    watch(srcStylus, taskStylus)
    watch(srcStylus, taskBsReload)
}

const taskBrowserSync = cb => {
    browserSync.init({
        server: {
            baseDir: './',
            index: 'index.html',
        },
    })
    cb()
}

const taskBsReload = cb => {
    browserSync.reload()
    cb()
}

const taskPug = () => {
	return src(srcPug)
		.pipe(pug({
			pretty: true
		}))
		.pipe( dest( './dest/' ) )
    // cb()
}

const taskStylus = () => {
    return src(srcStylus)
        .pipe(stylus())
        .pipe(dest('./dest/css'))
    // cb()
}

exports.default = series(parallel(taskBrowserSync, watchTasks))
exports.pug = taskPug
exports.styl = taskStylus