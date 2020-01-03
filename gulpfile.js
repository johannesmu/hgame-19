const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const beautify = require('gulp-beautify');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');

const { src, dest, series, parallel, watch } = require('gulp');
const browsersync = require('browser-sync').create();

const buildDir = './dist';
const libDir = './lib';
const srcDir = './src';

function reload( done ){
  browsersync.reload();
  done();
}

function clean(){
  return del([buildDir + '/**/**']);
}

function html(){
  return src('./src/*.html')
  .pipe(beautify.html({indent_size: 2}))
  .pipe( dest(buildDir) )
}

function css(){
  return src( 'scss/main.scss')
    .pipe(sass())
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe( rename({extname: '.min.css'}) )
    .pipe(sourcemaps.write('.'))
    .pipe(dest(buildDir + '/css'))
    .pipe(browsersync.stream())
}

function app(){
  return src('app/*.js')
  .pipe( sourcemaps.init() )
  .pipe( concat('main.js') )
  .pipe( uglify() )
  .pipe(rename({ extname: '.min.js' }))
  .pipe(sourcemaps.write('maps'))
  .pipe( dest(buildDir + '/scripts') )
}

function lib() {
  return src(['node_modules/easeljs/lib/*.min.js', 'node_modules/gsap/dist/gsap.min.js', 'node_modules/createjs/builds/1.0.0/*.min.js', 'node_modules/axios/dist/*.min.js'])
  .pipe( dest(buildDir + '/lib') )
}

function data(){
  return src( 'data/*.json')
  .pipe( dest(buildDir + '/data') )
}

function assets(){
  return src( 'assets/**/**')
  .pipe( dest(buildDir + '/assets') )
}

function browserSync(done) {
  browsersync.init({
    watch: true,
    port: 3000,
    cors: true,
    server: './dist'
  });
  done();
}

function reload( done ){
  browsersync.reload();
  done();
}

function watchFiles(){
  return watch( ['./scss/*.scss', './lib/*.js', srcDir + '/*.html', './app/*.js', 'data/*.json'], series(clean,data, assets, css, lib, app, html,reload));
}


exports.css = css;
exports.clean = series( clean );
exports.watch = parallel(watchFiles,data, assets, css, lib, app, html, browserSync);