var gulp = require("gulp");
var pug = require('gulp-pug');
var sass = require('gulp-sass');

// Pug to HTML

gulp.task('pug', function(){
    gulp.src('./src/*.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('./'))
})

gulp.task('sass', function(){
    gulp.src('./sass/*.sass')
    .pipe(sass({
        pretty: true
    }))
    .pipe(gulp.dest('./'))
})

gulp.task('watch', function(){
    gulp.watch('./src/*.pug', ['pug'])
    gulp.watch('./sass/*.sass', ['sass'])
});

gulp.task('default', ['pug', 'sass', 'watch']);