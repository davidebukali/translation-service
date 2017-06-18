//Initialize Angular and create routes
var kacheApp = angular.module('kache', [
	'ui.router', 
	'uiRouterStyles', 	
	'angular-loading-bar',
	'ncy-angular-breadcrumb',
	'ngSanitize'
]);

kacheApp.config(function(
	$stateProvider, 
	$urlRouterProvider, 
	$locationProvider, 
	$qProvider, 
	$provide, 
	$httpProvider
	){

	$stateProvider
	.state('parent', {
		templateUrl : 'html-pages/home.html',
		controller: 'AdminHomeCtlr',
		abstract: true
	})

	.state('parent.homeState', {
		url: '/',
		templateUrl : 'html-pages/dashboard.html',
		controller: 'Dashboard',
		data: {
			css: ['dist/css/gentelella-admin.css', 'dist/css/kache-app.css']
		},
		ncyBreadcrumb: {
		    label: 'Translate'
		}
	})

	.state('parent.history', {
		url: '/history',
		templateUrl : 'html-pages/history.html',
		/*controller: 'ViewSponsors',*/
		data: {
			css: ['dist/css/gentelella-admin.css', 'dist/css/kache-app.css']
		},
		ncyBreadcrumb: {
		    label: 'History',
		    parent: 'parent.homeState'
		}
	});

	$urlRouterProvider.otherwise('/');

	$qProvider.errorOnUnhandledRejections(false);

	$locationProvider.html5Mode(true);

});

kacheApp.run(function($rootScope, $document){
	$rootScope.$on('$stateChangeSuccess', function(event, toState){
		$document[0].body.scrollTop = $document[0].documentElement.scrollTop = 0;
	});
});