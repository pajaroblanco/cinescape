var gulp                = require('gulp'),
svgSprite               = require('gulp-svg-sprite');

gulp.task('svg-sprite:create-home-icons', function () {
    var config = {
        shape: {
            spacing: {
                padding: 10
            }
        },
        mode: {
            view: {
                bust: false,
                render: {
                    scss: true
                }
            }
        }
    };

    var dir = 'grails-app/assets/images/home-icons';
    return gulp.src('*.svg', {cwd: dir})
        .pipe(svgSprite(config))
        .pipe(gulp.dest(dir + '/dest'));
});

gulp.task('svg-sprite:create-tab-icons', function () {
    var config = {
        shape: {
            spacing: {
                padding: 15,
                box: 'icons'
            }
        },
        mode: {
            view: {
                bust: false,
                render: {
                    scss: true
                }
            }
        }
    };

    var dir = 'grails-app/assets/images/vertical-tab-icons';
    return gulp.src('*.svg', {cwd: dir})
        .pipe(svgSprite(config))
        .pipe(gulp.dest(dir + '/dest'));
});