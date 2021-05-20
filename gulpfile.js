// require
const {
    src,
    dest,
    watch,
    parallel,
    series
} = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify-es').default,
    cleancss = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    cleandist = require('del'),
    browserSync = require('browser-sync').create();
// function
function browsersync() {
    browserSync.init({
        server: {
            proxy: '127.0.0.1:8000',
            baseDir: 'app',
            port: 8000
        }
    })
}

function style() {
    return src(["app/style/*.scss", "app/style/*.css", "!app/style/*.min.css"])
        .pipe(sass())
        .pipe(cleancss({
            keepBreaks: false
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(dest("app/style"))
        .pipe(browserSync.stream());
}

function script() {
    return src(['app/script/**/*.js', '!app/script/**/*.min.js'])
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(dest('app/script'))
        .pipe(browserSync.stream());

}

function del() {
    return cleandist('dist');
}

function image() {
    return src(['app/image/**/*'])
        .pipe(imagemin([
            imagemin.gifsicle({
                interlaced: true
            }),
            imagemin.mozjpeg({
                quality: 75,
                progressive: true
            }),
            imagemin.optipng({
                optimizationLevel: 5
            }),
            imagemin.svgo({
                plugins: [{
                        removeViewBox: true
                    },
                    {
                        cleanupIDs: false
                    }
                ]
            })
        ]))
        .pipe(dest('app/image'))
}

function watching() {
    watch(['app/style/**/*.scss', 'app/style/**/*.css', '!app/style/**/*.min.css'], style)
    watch(['app/script/**/*.js', '!app/script/**/*.min.js'], script)
    watch("app/*.html").on('change', browserSync.reload);
    watch("app/*.php").on('change', browserSync.reload);
}

function build() {
    return src(['app/*.html', 'app/*.php', 'app/*.txt', 'app/*.xml', 'app/*image/**/*', 'app/*script/**/*.min.js', 'app/*style/**/*.min.css', 'app/*font/**/*'])
        .pipe(dest('dist'))
}

exports.default = parallel(watching, style, script, browsersync)
exports.build = series(del, image, build);