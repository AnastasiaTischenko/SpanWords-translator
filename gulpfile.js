const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const del = require('del');
const babel = require('gulp-babel');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');

gulp.task('html', function() {
    return gulp.src('./src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.reload({
            stream: true
        })); 
});

gulp.task('css', function() {
    return gulp.src('./src/sass/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(gulp.dest('./dist/styles'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js', function() {
    gulp.src('./src/js/script.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('img', function() {
    return gulp.src('./src/img/**/*.+(png|jpg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'))
})

gulp.task('watch', function() {
    gulp.watch('./src/*.html', ['html']);
    gulp.watch('./src/sass/**/*.scss', ['css']);
    gulp.watch('./src/js/*.js', ['js']);
});

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
});

gulp.task('del:dist', function() {
    return del.sync('./dist');
})

gulp.task('build', ['html', 'css', 'js', 'img']);

gulp.task('start', ['del:dist', 'build', 'server', 'watch']);