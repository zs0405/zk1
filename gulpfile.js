/*
 * @Author: mikey.ss 
 * @Date: 2018-11-05 08:51:25 
 * @Last Modified by: mikey.ss
 * @Last Modified time: 2018-11-05 09:59:49
 */
//引入
var gulp = require("gulp");
var webserver = require("gulp-webserver");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var path = require("path");
var fs = require("fs");
var url = require("url");
//编译sass
gulp.task("sass", function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./src/css/"));
});
//监听变化
gulp.task("change", function() {
    return gulp.watch("./src/scss/*.scss", gulp.series("sass"));
});
//搭服务器
gulp.task("server", function() {
    return gulp.src("./src").pipe(webserver({
        port: 8989,
        host: "localhost",
        livereload: true,
        middleware: [function(req, res, next) {
            var pathname = url.parse(req.url, true).pathname;
            if (req.url === "/favicon.ico") {
                return res.end()
            }
            if (/^\/api/.test(pathname)) {
                res.end(JSON.stringify({ code: 1, masagge: "搜索页" }));

            } else {
                pathname = pathname === "/" ? "index.html" : pathname;
                res.end(fs.readFileSync(path.join(__dirname, "src", pathname)))
            }
        }]
    }));
});
//压缩js
gulp.task("minjs", function() {
    return gulp.src("./src/js/*.js").pipe(uglify()).pipe(gulp.dest("./src/minjs/"));
});
//任务流
gulp.task("alls", function() {
    return gulp.series("sass", "server", "change", "minjs");
});