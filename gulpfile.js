var gulp          = require('gulp');
var notify        = require('gulp-notify');
var source        = require('vinyl-source-stream');
var browserify    = require('browserify');
var babelify      = require('babelify');
var ngAnnotate    = require('browserify-ngannotate');
var browserSync   = require('browser-sync').create();
var rename        = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var uglify        = require('gulp-uglify');
var merge         = require('merge-stream');
var sass = require('gulp-sass');

// Onde os arquivos estão localizados
var jsFiles   = "src/js/**/*.js";
var viewFiles = "src/js/**/*.html";
var sassFiles = "src/sass/**/*.sass";

var interceptErrors = function(error) {
  var args = Array.prototype.slice.call(arguments);
 
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);


  this.emit('end');
};


gulp.task('browserify', ['views'], function() {
  return browserify('./src/js/app.js')
      .transform(babelify, {presets: ["es2015"]})
      .transform(ngAnnotate)
      .bundle()
      .on('error', interceptErrors)
   
      .pipe(source('main.js'))
      
      .pipe(gulp.dest('./build/'));
});

gulp.task('html', function() {
  return gulp.src("src/index.html")
      .on('error', interceptErrors)
      .pipe(gulp.dest('./build/'));
});

gulp.task('views', function() {
  return gulp.src(viewFiles)
      .pipe(templateCache({
        standalone: true
      }))
      .on('error', interceptErrors)
      .pipe(rename("app.templates.js"))
      .pipe(gulp.dest('./src/js/config/'));
});

//converte sass para css
gulp.task('styles', function () {
     gulp.src('src/css/bootstrap.min.css')
        .on('error', interceptErrors)
        .pipe(gulp.dest('./build/'));  

    gulp.src(sassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/'));  
});

// PRODUÇÃO
// minified JS/CSS na pasta dist
gulp.task('build', ['html', 'browserify'], function() {
  var html = gulp.src("build/index.html")
                 .pipe(gulp.dest('./dist/'));

  var js = gulp.src("build/main.js")
               .pipe(uglify())
               .pipe(gulp.dest('./dist/'));  

   var css = gulp.src(sassFiles)
                .pipe(sass().on('error', sass.logError))
                .pipe(gulp.dest('./dist/'));             

  return merge(html,js, css);
});

gulp.task('default', ['html', 'browserify', 'styles'], function() {

  browserSync.init(['./build/**/**.**'], {
    server: "./build",
    port: 4000,
    notify: false,
    ui: {
      port: 4001
    }
  });

  gulp.watch("src/index.html", ['html']);
  gulp.watch(sassFiles, ['styles']);
  gulp.watch(viewFiles, ['views']);
  gulp.watch(jsFiles, ['browserify']);
});
