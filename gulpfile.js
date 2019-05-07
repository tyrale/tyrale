var gulp = require("gulp");
var pug = require('gulp-pug');
var sass = require('gulp-sass');

// Pug to HTML

gulp.task('pug', function(){
    return gulp.src('./src/*.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('./'))
})

gulp.task('sass', function(){
    return gulp.src('./sass/*.sass')
    .pipe(sass({
        pretty: true
    }))
    .pipe(gulp.dest('./'))
})

gulp.task('watch', function(){
    gulp.watch('./src/*.pug', gulp.series(['pug']))
    gulp.watch('./sass/*.sass', gulp.series(['sass']))
});

gulp.task('default', gulp.series(['pug', 'sass', 'watch']));