var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var Server = require('karma').Server;

var bootstrapPath = 'node_modules/bootstrap/dist';
var angularPath = 'node_modules/angular';
var angularUiRouterPath = 'bower_components/angular-ui-router/release';
var uiRouterStyles = 'bower_components/angular-ui-router-styles';
var angularBreadcrumbPath = 'bower_components/angular-breadcrumb/dist';
var node_modules_path = 'node_modules/';
var resources = 'assets/';

//Process Styles
gulp.task('styles', function() {
	return gulp.src([
		bootstrapPath+'/css/bootstrap.min.css',
		node_modules_path+'please-wait/build/please-wait.css',
		node_modules_path+'font-awesome/css/font-awesome.min.css',
		node_modules_path+'angular-loading-bar/build/loading-bar.min.css',
		resources+'libs/iCheck/skins/flat/green.css',
		resources+'libs/switchery/dist/switchery.min.css',
		resources+'libs/bootstrap-daterangepicker/daterangepicker.css',
		resources+'libs/dropzone/dist/min/basic.min.css',
		resources+'libs/dropzone/dist/min/dropzone.min.css',
		resources+'libs/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.min.css',
		resources+"libs/jQuery-Smart-Wizard/styles/smart_wizard_vertical.css",
		resources+'css/animate.css',
		resources+"libs/angular-datatables/css/angular-datatables.min.css",
		resources+"libs/angular-datatables/plugins/bootstrap/datatables.bootstrap.min.css",
		resources+"libs/pnotify/dist/pnotify.css",
		resources+"libs/pnotify/dist/pnotify.buttons.css",
		node_modules_path+"ui-select/dist/select.min.css"
		])
	.pipe(concat('app.css'))
	.pipe(gulp.dest('dist/css'));
});

//Process vendor scripts
gulp.task('vendorscripts', function() {
	return gulp.src([
		resources+'libs/jquery/dist/jquery.min.js',
		resources+'libs/datatables.net/js/jquery.dataTables.min.js',
		angularPath+'/angular.js',
		angularUiRouterPath+'/angular-ui-router.js',
		uiRouterStyles+ '/ui-router-styles.js',
		bootstrapPath+'/js/bootstrap.min.js',
		node_modules_path+'angular-loading-bar/build/loading-bar.min.js',
		angularBreadcrumbPath+'/angular-breadcrumb.min.js',
		node_modules_path+'ng-file-upload/dist/ng-file-upload-shim.min.js',
		node_modules_path+'ng-file-upload/dist/ng-file-upload.min.js',
		resources+'libs/jquery.easing.1.3.js',
		resources+'libs/jquery.pulse.min.js',
		resources+'libs/jqBootstrapValidation.js',
		resources+'libs/bootstrap-notify.min.js',
		resources+'libs/fastclick/lib/fastclick.js',
		node_modules_path+'please-wait/build/please-wait.js',
		resources+'libs/dropzone/dist/min/dropzone.min.js',
		resources+'libs/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js',
		resources+'libs/Chart.js/dist/Chart.min.js',
		resources+'libs/iCheck/icheck.min.js',
		resources+'libs/switchery/dist/switchery.min.js',
		resources+'libs/moment/min/moment.min.js',
		resources+'libs/bootstrap-daterangepicker/daterangepicker.js',
		resources+'libs/jQuery-Smart-Wizard/js/jquery.smartWizard.js',
		'bower_components/ng-backstretch/dist/ng-backstretch.min.js',

		resources+'libs/angular-datatables/angular-datatables.min.js',
		resources+'libs/angular-datatables/plugins/bootstrap/angular-datatables.bootstrap.min.js',

		resources+'libs/pnotify/dist/pnotify.js',
		resources+'libs/pnotify/dist/pnotify.buttons.js',

		node_modules_path+'angular-sanitize/angular-sanitize.min.js',
		node_modules_path+'ui-select/dist/select.min.js',

		node_modules_path+'lodash/lodash.min.js'

		])
	.pipe(concat('vendor.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});

//Process Scripts
gulp.task('scripts', function() {
	return gulp.src([
		resources+'js/InitializeAngularApp.js',
		resources+'js/factory/**/*.js',
		resources+'js/services/**/*.js',
		resources+'js/directives/**/*.js',
		resources+'js/controllers/**/*.js'
		])
	.pipe(concat('app.js'))
	.pipe(ngAnnotate())
	//.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});

//Move bootstrap dependency files
gulp.task('move-bootstrap-files', function() {
	return gulp.src([
		'node_modules/font-awesome/fonts/**/*',
		'node_modules/bootstrap/dist/fonts/**/*'
		])
	.pipe(gulp.dest('dist/fonts'));
});

//Move images files
gulp.task('move-images-files', function() {
	return gulp.src('assets/img/**/*')
	.pipe(gulp.dest('dist/img'));
});

//Move css and image files
gulp.task('move-css-files', function() {
	return gulp.src([
		'assets/libs/iCheck/skins/flat/flat.png',
		'assets/libs/iCheck/skins/flat/flat@2x.png',
		'assets/css/main.css',
		'assets/css/kache-app.css',
		'assets/css/gentelella-admin.css'
		])
	.pipe(gulp.dest('dist/css'));
});

//Move green image file for iCheck
gulp.task('move-icheck-files', function() {
	return gulp.src([
		'assets/libs/iCheck/skins/flat/green.png',
		'assets/libs/iCheck/skins/flat/green@2x.png'
		])
	.pipe(gulp.dest('dist/css/flat'));
});

//Watch Files For Changes
gulp.task('watch', function() {
	gulp.watch('assets/css/*.css', ['move-css-files']);
	gulp.watch('assets/js/**/*.js', ['scripts']);
});

/**
 * Run test once and exit
 */
 gulp.task('test', function (done) {
 	new Server({
 		configFile: __dirname + '/karma.conf.js',
 		singleRun: false
 	}, done).start();
 });

//Default Task
gulp.task('default', function(){
	gulp.start(
		'styles', 
		'move-bootstrap-files', 
		'move-images-files',
		'move-icheck-files',
		'move-css-files',
		'vendorscripts', 
		'scripts',
		'test',
		'watch');
});
