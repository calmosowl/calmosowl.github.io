const {task, src, dest, series, watch} = require('gulp');
const sass = require('gulp-sass');
const stylelint = require('gulp-stylelint');
const browserSync = require('browser-sync').create();

const paths = {
  html: {
    src: './*.html'
  },
  styles: {
    src: 'src/**/*.scss',
    dest: 'css',
  }
};

task('lint-css', () => {
  return src(paths.styles.src)
    .pipe(stylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
});

task('sass', () => {
  return src(paths.styles.src)
    .pipe(stylelint({failAfterError: false, reporters: [{formatter: 'string', console: true}]}))
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
});

task('html', () => {
  return src(paths.html.src)
    .pipe(dest('./'))
    .pipe(browserSync.stream());
});

task('serve', series('html', 'sass', () => {
  browserSync.init({
    server: "./"
  });

  watch(paths.styles.src, series('sass'));
  watch(paths.html.src, series('html')).on('change', browserSync.reload);
}));

task('default', series('serve'));
