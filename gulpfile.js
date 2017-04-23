var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsproject = ts.createProject("tsconfig.json");

gulp.task("default", function(){
    return tsproject.src()
        .pipe(tsproject()).js
        .pipe(gulp.dest("dist"));
});