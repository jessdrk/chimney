var gulp       = require('gulp'),
sass         = require('gulp-sass')(require('sass')),
concat       = require('gulp-concat'),
uglify       = require('gulp-uglifyjs'),
cssnano      = require('gulp-cssnano'),
autoprefixer = require('gulp-autoprefixer'),
imagemin = require('gulp-imagemin'),
browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
browserSync.init({
ui: false,
notify: false,
server: {
  baseDir: 'public',
  watch: true
}});
});

gulp.task('images', async function() {
return gulp.src('src/assets/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('public/assets/images'))
    .pipe(browserSync.stream());
});

gulp.task('styles', function() {
return gulp.src([
    'src/scss/*.scss',
])
    .pipe(sass())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(concat('index.css'))
    .pipe(gulp.dest('public/assets/css'))
    .pipe(browserSync.stream());
});

gulp.task('styles-min', function() {
return gulp.src([
    'src/scss/*.scss',
])
    .pipe(sass())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(concat('index.css'))
    .pipe(cssnano())
    .pipe(gulp.dest('public/assets/css'))
});

gulp.task('scripts', function() {
return gulp.src([
    'src/js/*.js',
])
    .pipe(concat('index.js'))
    .pipe(gulp.dest('public/assets/js'))
    .pipe(browserSync.stream());
});

gulp.task('scripts-min', function() {
return gulp.src([
    'src/js/*.js',
])
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/assets/js'));
});

gulp.task('html', function() {
return gulp.src([
  'src/index.html',
])
  .pipe(gulp.dest('public'));
});

gulp.task('fonts', function() {
return gulp.src([
    'src/assets/fonts/*',
])
    .pipe(gulp.dest('public/assets/fonts'));
});

var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
 
gulp.task('deploy', function() {
  return gulp.src('./public/**/*')
    .pipe(ghPages());
});

gulp.task('watch', function() {
gulp.watch('src/scss/*.scss', gulp.parallel('styles'));
gulp.watch('src/js/*.js', gulp.parallel('scripts'));
gulp.watch('src/assets/images/*', gulp.parallel('images'));
gulp.watch('src/index.html', gulp.parallel('html')).on('change',browserSync.reload);
gulp.watch('src/assets/fonts/*', gulp.parallel('fonts'));
});

gulp.task('dev', gulp.parallel('styles', 'scripts', 'images', 'html', 'fonts', 'browser-sync', 'watch'));
gulp.task('prod', gulp.parallel('styles-min', 'scripts-min', 'images'));