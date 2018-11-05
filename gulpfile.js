/*
 * @Author: mikey.ss 
 * @Date: 2018-11-05 08:51:25 
 * @Last Modified by: mikey.ss
 * @Last Modified time: 2018-11-05 09:08:46
 */
//引入
var gulp = require("gulp");
var webserver = require("gulp-webserver");
var sass = require("gulp-sass");
var path = require("path");
var fs = require("fs");
var url = require("url");
//编译sass
gulp.task("sass", function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./src/css/"));
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
                return req.end()
            }
            if (/^\/api/.test(pathname)) {

            } else {
                pathname = pathname === "/" ? "index.html" : pathname;
                res.end(fs.readFileSync(path.join(__dirname, "src", pathname)))

            }
            res.end("ss");
        }]
    }));
});