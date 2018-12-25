const 
  gulp =  require('gulp'),
  rigger = require('gulp-rigger'),
  rename = require("gulp-rename"),
  sass = require('gulp-sass'),
  prefixer = require('gulp-autoprefixer'),
  watch = require('gulp-watch'),
  browserSync = require('browser-sync'),
  markdown = require('gulp-markdown'),
  reload = browserSync.reload;

const path = {
  build: {
    html: './',
    js: './js/',
    css: 'css/',
    img: './images/',
    markdown: './html/',
    fonts: './fonts/'
  },
  src: {
    markdown: 'src/markdown/*.md',
    html: './html/*.html',
    style: 'src/sass/main.scss',
    img: 'src/images/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  watch: {
    markdown: 'src/markdown/*.md',
    html: './html/*.html',
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

gulp.task('markhtml', () =>
gulp.src(path.src.markdown)
  .pipe(markdown())
  .pipe(rename(function (path) {
    path.extname = ".html";
  }))
  .pipe(gulp.dest('html'))
);

gulp.task('html', function () {
  gulp.src(path.src.html)
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

gulp.task('webserver', function () {
  browserSync(config);
});

gulp.task('watch', function () {
  watch([path.watch.markdown], function (event, cb) {
    gulp.start('markhtml'); 
  });
  // Необходимо перенести склейку html частей в один файл в папку src, а
  // результат отдавать в ./index.html
  // watch([path.watch.html], function (event, cb) {
  //   gulp.start('html');
  // });
  watch([path.watch.style], function (event, cb) {
    gulp.start('style'); 
  });
});

gulp.task('default', ['webserver', 'watch']);
