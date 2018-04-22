const 
  gulp =  require('gulp'),
  rigger = require('gulp-rigger'),
  sass = require('gulp-sass'),
  prefixer = require('gulp-autoprefixer'),
  watch = require('gulp-watch'),
  browserSync = require("browser-sync"),
  markdown = require('gulp-markdown'),
  reload = browserSync.reload;

const path = {
  build: {
    html: './',
    js: './js/',
    css: './css/',
    img: './images/',
    fonts: './fonts/'
  },
  src: {
    markdown: 'src/**/*.md',
    html: 'src/*.html',
    style: 'src/sass/main.scss',
    img: 'src/images/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  watch: {
    markdown: 'src/**/*.md',
    html: 'src/**/*.html',
    js: 'src/js/**/*.js',
    style: 'src/sass/**/*.scss',
    img: 'src/images/**/*.*',
    fonts: 'src/fonts/**/*.*'
  }
};

const config = {
  server: {
    baseDir: "./"
  },
  tunnel: false,
  host: 'localhost',
  port: 3000,
  logPrefix: "calmos"
};

gulp.task('markdown', () =>
  gulp.src(path.src.markdown)
    .pipe(markdown())
    .pipe(gulp.dest('./'))
);

gulp.task('html', function () {
  gulp.src(path.src.html)
    .pipe(markdown())
    .pipe(rigger())
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({ stream: true }));
});

gulp.task('style', function () {
  gulp.src(path.src.style)
    .pipe(sass({
      outputStyle: 'expanded'
    }))
  .pipe(prefixer())
  .pipe(gulp.dest(path.build.css))
  .pipe(reload({ stream: true }));
});

gulp.task('watch', function () {
  watch([path.watch.html], function (event, cb) {
    gulp.start('html:build'); 
  });
  watch([path.watch.style], function (event, cb) {
    gulp.start('style:build'); 
  });
  watch([path.watch.js], function (event, cb) {
    gulp.start('js:build'); 
  });
  watch([path.watch.img], function (event, cb) {
    gulp.start('image:build'); 
  });
  watch([path.watch.fonts], function (event, cb) {
    gulp.start('fonts:build'); 
  });
});

gulp.task('default', ['build', 'webserver', 'watch']);