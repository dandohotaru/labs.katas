var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var tsify = require("tsify");
var paths = {
    pages: ["src/*.html"]
};

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});

gulp.task("default", ["copy-html"], function () {
    var options = {
        basedir: '.',
        debug: true,
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    };
    
    return browserify(options)
        .plugin(tsify)
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("dist"));
});