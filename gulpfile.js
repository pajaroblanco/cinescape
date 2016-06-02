var gulp = require("gulp");
var babel = require("gulp-babel");
var concat = require("gulp-concat");

gulp.task("js.es6", function () {
    return gulp.src(["app/registerComponent.js", "app/**/*.js", '!app/bower_components/**/*.js'])
        //.pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat("all.js"))
        //.pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist/js"));
});