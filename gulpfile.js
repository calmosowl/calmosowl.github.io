const {task, src, dest, series, watch} = require('gulp');
const sass = require('gulp-sass');
const stylelint = require('gulp-stylelint');
const browserSync = require('browser-sync').create();

const paths = {
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

task('serve', series('sass', () => {
  browserSync.init({
    server: "./"
  });

  watch(paths.styles.src, series('sass'));
}));

task('default', series('serve'));
