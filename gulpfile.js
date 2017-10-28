// Gulp Dependencies
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');

// Inputs
const sassMain = 'public/stylesheets/main.sass';
const sassIn = 'public/stylesheets/**/*.sass';
const es6In = 'app/**/*.js';
const imagesIn = 'public/images/**/*';
const views = '**/*.html';
const viewsMain = 'index.html';

// Outputs
const sassOut = 'public/stylesheets';
const es6Out = 'public/javascripts';
const imagesOut = 'public/images';
const viewsOut = 'public';

// Default task
gulp.task('default', ['build', 'serve']);

// Compile to build directory
gulp.task('build', ['sass', 'js']);

// Monitor files for changes
gulp.task('serve', () => {
	browserSync.init({
		server: './',
		open: false, // Dont automatically open browser
	});
	gulp.watch(sassIn, ['sass']);
	gulp.watch(es6In, ['js']);
	gulp.watch(views).on('change', browserSync.reload);
});

// Minify html and remove comments
gulp.task('html', () => {
	return gulp
		.src(viewsMain)
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true
		}))
		.pipe(rename('index.min.html'))
		.pipe(gulp.dest(viewsOut))
		.pipe(browserSync.stream());
});

// Compile, minify and concatenate sass files
gulp.task('sass', () => {
	return gulp
		.src(sassMain)
		.pipe(sourcemaps.init())
      .pipe(sass({
			outputStyle: 'compressed',
			errLogToConsole: true
		}).on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(autoprefixer())
      .pipe(concat('styles.bundle.css'))
      .pipe(gulp.dest(sassOut))
      .pipe(browserSync.stream());
});

// Compile, minify and concatenate es6 files
gulp.task('js', () => {
	return gulp
		.src([es6In, '!' + es6Out + '/app.bundle.js']) // Don't recompile bundle
      .pipe(sourcemaps.init())
      .pipe(babel({ presets: ['es2015'] }))
      .pipe(uglify())
      .pipe(concat('app.bundle.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(es6Out))
      .pipe(browserSync.stream());
});

// Optimize images
gulp.task('images', () => {
	return gulp
		.src(imagesIn)
      .pipe(imagemin())
      .pipe(gulp.dest(imagesOut))
      .pipe(browserSync.stream());
});
