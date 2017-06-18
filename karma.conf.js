// Karma configuration
// Generated on Sat Jun 17 2017 20:47:25 GMT+0300 (E. Africa Standard Time)
var resources = 'assets/';
var angularUiRouterPath = 'bower_components/angular-ui-router/release';
var uiRouterStyles = 'bower_components/angular-ui-router-styles';
var angularBreadcrumbPath = 'bower_components/angular-breadcrumb/dist';
var node_modules_path = 'node_modules/';

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        //css files
        node_modules_path+'please-wait/build/please-wait.css',
        node_modules_path+'font-awesome/css/font-awesome.min.css',
        node_modules_path+'angular-loading-bar/build/loading-bar.min.css',
        resources+"libs/pnotify/dist/pnotify.css",
        resources+"libs/pnotify/dist/pnotify.buttons.css",
        'assets/css/main.css',
        'assets/css/kache-app.css',
        'assets/css/gentelella-admin.css',

        //js files
        resources+'libs/jquery/dist/jquery.min.js',
        'node_modules/angular/angular.js',
        'node_modules/angular-mocks/angular-mocks.js',
        angularUiRouterPath+'/angular-ui-router.js',
        uiRouterStyles+ '/ui-router-styles.js',
        node_modules_path+'angular-loading-bar/build/loading-bar.min.js',
        angularBreadcrumbPath+'/angular-breadcrumb.min.js',
        node_modules_path+'angular-sanitize/angular-sanitize.min.js',
        resources+'libs/jqBootstrapValidation.js',
        resources+'libs/bootstrap-notify.min.js',
        resources+'libs/fastclick/lib/fastclick.js',
        resources+'libs/pnotify/dist/pnotify.js',
        resources+'libs/pnotify/dist/pnotify.buttons.js',
        node_modules_path+'lodash/lodash.min.js',

        resources+'js/InitializeAngularApp.js',
        resources+'js/factory/*.js',
        resources+'js/services/*.js',
        resources+'js/directives/*.js',
        resources+'js/controllers/*.js',
        'tests/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
