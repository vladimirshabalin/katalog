'use strict';

var gulp = require('gulp'),
    wiredep = require('wiredep').stream,
    useref = require('gulp-useref'),
    uglyfy = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    gulpif = require('gulp-if'),
    clean = require('gulp-clean'),
    bs = require('browser-sync'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    htmlmin = require('gulp-htmlmin');

//Clean (удаляем папку dist перед тем как создавать новую)
gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

// PUG преобразуем в html
gulp.task('pug', () => {
    return gulp.src('app/pug/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('app/html/'))
});
gulp.task('pug:watch', () => {
    return gulp.watch('app/pug/**/*.pug', gulp.series('pug:bower', (done) => {
        bs.reload();
        done();
    }));
});

// SASS преобразуем в CSS
gulp.task('sass', function () {
    return gulp.src('./app/sass/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('./app/css'));
});
gulp.task('sass:watch', () => {
    return gulp.watch('app/sass/**/*.sass', gulp.series('sass', 'build', (done) => {
        bs.reload();
        done();
    }));
});

// Bower (подключение новых библиотек и плагинов через bower к файлам html)
gulp.task('bower', () => {
    return gulp.src('./app/html/index.html')
        .pipe(wiredep({
            directory: "app/bower_components"
        }))
        .pipe(gulp.dest('./app/html'));
});

// Build (строим нашу папку dist)
gulp.task('build', () => {
    return gulp.src('./app/html/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglyfy()))
        .pipe(gulpif('*.css', minifyCss()))
        // .pipe(htmlmin())                     // минификация html не реализована
        .pipe(gulp.dest('dist'));
});
gulp.task('minify', () => {
    return gulp.src('dist/*.html')
        .pipe(htmlmin())
        .pipe(gulp.dest('dist'));
});
gulp.task('minify:watch', () => {
    return gulp.watch('dist/*.html', gulp.series('minify', (done) => {
        bs.reload();
        done();
    }));
});

gulp.task('js:watch', () => {
    return gulp.watch('app/js/*.js', gulp.series('build', (done) => {
        bs.reload();
        done();
    }));
});


// Local Server
gulp.task('server', () => {
    return bs({
        browser: 'google chrome canary',
        server: {
            baseDir: 'dist'
        }
    })
});

gulp.task('pug:bower', gulp.series('pug', 'bower', 'build'));

gulp.task('default', gulp.series('clean', 'pug:bower', gulp.parallel('pug:watch', 'sass:watch', 'js:watch', 'server')));