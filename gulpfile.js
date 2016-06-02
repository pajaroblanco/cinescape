var gulp = require("gulp");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var $    = require('gulp-load-plugins')();

var distPath = 'app/dist';

var sassPaths = [
    'app/bower_components/foundation-sites/scss',
    'app/bower_components/motion-ui/src',
    'app/scss/**/*.scss'
];

var jsPaths = [
    "app/bower_components/jquery/dist/jquery.js",
    "app/bower_components/velocity/velocity.js",
    "app/bower_components/velocity/velocity.ui.js",
    "app/bower_components/angular/angular.js",
    "app/bower_components/angular-animate/angular-animate.js",
    "app/bower_components/angular-route/angular-route.js",
    "app/bower_components/angular-velocity-revival/angular-velocity.js",
    "app/bower_components/angular/angular.js",
    "app/registerComponent.js",
    "app/angular-app/**/*.js"
];

gulp.task('sass', function() {
    return gulp.src('app/scss/app.scss')
        .pipe($.sass({
            includePaths: sassPaths
        })
            .on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(gulp.dest(distPath));
});

gulp.task("js", function () {
    return gulp.src(jsPaths)
        //.pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat("app.js"))
        //.pipe(sourcemaps.write("."))
        .pipe(gulp.dest(distPath));
});

gulp.task("html", function() {
    return gulp.src("app/*.html")
        .pipe(gulp.dest(distPath));
});

gulp.task('default', ['sass', 'js', 'html'], function() {
    gulp.watch(['app/scss/**/*.scss'], ['sass']);
    gulp.watch(['app/angular-app/**/*.js'], ['js']);
    gulp.watch(['app/*.html'], ['html']);
});
