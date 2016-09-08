var gulp = require('gulp');
var less = require('gulp-less');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
// requires browserify and vinyl-source-stream
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var Server = require('karma').Server;
var sequence = require('run-sequence');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var rev = require('gulp-rev');
var revReplace = require("gulp-rev-replace");
var clean = require("gulp-clean");
var argv = require('yargs').argv;
var ngHtml2Js = require("gulp-ng-html2js");
var concat = require("gulp-concat");
var gzip = require('gulp-gzip');
var scp = require('gulp-scp2');
var GulpSSH = require('gulp-ssh')

gulp.task('webserver', function () {
    connect.server({
        root: ['tmp'],
        port: process.env.PORT,
        livereload: {
            port: 8081
        }
    });
});

gulp.task('clean-scripts', function () {
  return gulp.src('./tmp/js/', {read: false})
    .pipe(clean());
});

gulp.task('clean-css', function () {
  return gulp.src('./tmp/css/*.css', {read: false})
    .pipe(clean());
});

gulp.task('minify-html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };

  var manifestJS = gulp.src('./tmp/js/rev-manifest.json');
  var manifestCSS = gulp.src('./tmp/css/rev-manifest.json');
  return gulp.src('./app/*.html')
    .pipe(revReplace({manifest: manifestJS}))
    .pipe(revReplace({manifest: manifestCSS}))    
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./tmp/'));
});

gulp.task('views', function() {
  return gulp.src("./app/views/*.html")
    .pipe(minifyHTML({
        empty: true,
        spare: true,
        quotes: true
    }))
    .pipe(ngHtml2Js({
        moduleName: "app.views"
    }))
    .pipe(concat("views.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./tmp/js"));
  
});

gulp.task('scripts', ['clean-scripts'], function() {
    // Grabs the app.js file
    
  var bundler = browserify('./app/app.module.js');
  return bundler
    // bundles it and creates a file called main.js
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rev())
    .pipe(sourcemaps.write())
    // saves it the public/js/ directory
    .pipe(gulp.dest('./tmp/js'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./tmp/js'))
    .on('error', gutil.log);

});

gulp.task('copy-fonts', function() {
  return gulp.src(['./node_modules/font-awesome/fonts/*.*', './node_modules/bootstrap/dist/fonts/*.*'])
    .pipe(gulp.dest('./tmp/fonts'))    
    .on('error', gutil.log);  
});

gulp.task('copy-ui-grid-fonts', function() {
  return gulp.src(['./node_modules/angular-ui-grid/ui-grid.eot', './node_modules/angular-ui-grid/ui-grid.svg', './node_modules/angular-ui-grid/ui-grid.ttf', './node_modules/angular-ui-grid/ui-grid.woff'])
    .pipe(gulp.dest('./tmp/fonts/css'))    
    .on('error', gutil.log);  
});

gulp.task('less-compile', ['clean-css'], function() {
  return gulp.src('./app/styles/*.less')
    .pipe(less())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))    
    .pipe(concat('compile.css'))
    .pipe(gulp.dest('./tmp/css'))    
    .on('error', gutil.log);  
});

gulp.task('styles', ['less-compile'], function () {
  return gulp.src(['./tmp/css/compile.css', './node_modules/bootstrap/dist/css/bootstrap.css', './node_modules/font-awesome/css/font-awesome.css', './node_modules/angular-ui-grid/ui-grid.css', './node_modules/angular-ui-switch/angular-ui-switch.css'])
    .pipe(concat('style.css'))
    .pipe(sourcemaps.init())
    .pipe(minifyCSS())
    .pipe(rev())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./tmp/css'))      
    .pipe(rev.manifest())
    .pipe(gulp.dest('./tmp/css'))    
    .on('error', gutil.log);
});

gulp.task('livereload', function() {
  gulp.src(['tmp/css/*.css', 'tmp/js/*.js'])
    .pipe(watch('tmp/css/*.css'))
    .pipe(watch('tmp/js/*.js'))
    .pipe(watch('tmp/*.html'))
    .pipe(connect.reload())
    .on('error', gutil.log);
});

gulp.task('watch', function() {
    gulp.watch('app/**/*.js', ['scripts']);
    gulp.watch('app/styles/style.less', ['styles']) ; 
    gulp.watch('app/index.html', ['minify-html']);
    gulp.watch('app/views/**/*.html', ['views']);
});

var config = {  
  host: '10.255.211.124',
  port: 22,
  username: 'xsc5254',
  password: 'pdDV0815'
}
 
var ssh = new GulpSSH({
  ignoreErrors: false,
  sshConfig: config
});
 
gulp.task('clean-deploy', function () {
  return ssh
    .exec(['rm /deus/netcash-local/onboarding/spa/onboarding/js/*.js', 'rm /deus/netcash-local/onboarding/spa/onboarding/css/*.css'], {filePath: 'commands.log'})
    .pipe(gulp.dest('logs'))
    .on('error', gutil.log);
});

gulp.task('clean-static-deploy', function () {
  return ssh
    .exec(['rm /deus/netcash-local/onboarding/spa/onboarding/fonts/*.*'], {filePath: 'commands.log'})
    .pipe(gulp.dest('logs'))
    .on('error', gutil.log);
});

gulp.task('copyhtml', function() {
  return gulp.src('tmp/*.html')
  .pipe(scp({
    host: '10.255.211.124',
    username: 'xsc5254',
    password: 'pdDV0815',
    dest: '/deus/netcash-local/onboarding/spa/onboarding'
  }))
  .on('error', gutil.log);
});

gulp.task('copyjs', function() {
  return gulp.src('tmp/js/*.js')
  .pipe(scp({
    host: '10.255.211.124',
    username: 'xsc5254',
    password: 'pdDV0815',
    dest: '/deus/netcash-local/onboarding/spa/onboarding/js'
  }))
  .on('error', gutil.log);
});

gulp.task('copycss', function() {
  return gulp.src('tmp/css/*.css')
  .pipe(scp({
    host: '10.255.211.124',
    username: 'xsc5254',
    password: 'pdDV0815',
    dest: '/deus/netcash-local/onboarding/spa/onboarding/css'
  }))
  .on('error', gutil.log);
});

gulp.task('copyfonts', function() {
  return gulp.src('tmp/fonts/*.*')
  .pipe(scp({
    host: '10.255.211.124',
    username: 'xsc5254',
    password: 'pdDV0815',
    dest: '/deus/netcash-local/onboarding/spa/onboarding/fonts'
  }))
  .on('error', gutil.log);
});

gulp.task('copyuigridfonts', function() {
  return gulp.src('tmp/fonts/css/*.*')
  .pipe(scp({
    host: '10.255.211.124',
    username: 'xsc5254',
    password: 'pdDV0815',
    dest: '/deus/netcash-local/onboarding/spa/onboarding/css'
  }))
  .on('error', gutil.log);
});

gulp.task('chmod', function () {
  return ssh
    .exec(['chmod -R 755 /deus/netcash-local/onboarding/spa/onboarding'], {filePath: 'commands.log'})
    .pipe(gulp.dest('logs'))
    .on('error', gutil.log);
});

/**
 * Run test once and exit
 */
gulp.task('karma', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('build', function(callback) {
  sequence('scripts', 'styles', 'views', 'minify-html', callback);
});

gulp.task('test', function(callback) {
  sequence('build', 'karma', callback);
});

gulp.task('run', function(callback) { 
  gutil.log(argv.env);
  sequence('build', 'webserver', 'livereload', 'watch', callback);
});  

gulp.task('deploy', function(callback) { 
  gutil.log(argv.env);
  sequence('build', 'clean-deploy', 'copyhtml', 'copyjs', 'copycss', 'chmod', callback);
});  

gulp.task('static-deploy', function(callback) { 
  gutil.log(argv.env);
  sequence('copy-fonts', 'copy-ui-grid-fonts', 'clean-static-deploy', 'copyfonts', 'copyuigridfonts', 'chmod', callback);
});  