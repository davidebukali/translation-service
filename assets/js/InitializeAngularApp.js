//Initialize Angular and create routes
var kacheApp = angular.module('kache', [
	'ui.router', 
	'uiRouterStyles', 
	'ng-backstretch', 
	/*'angular-loading-bar', */
	'datatables', 
	'datatables.bootstrap',
	'ncy-angular-breadcrumb',
	'ui.select',
	'ngSanitize',
	'ngFileUpload'
]);

kacheApp.config(function(
	$stateProvider, 
	$urlRouterProvider, 
	$locationProvider, 
	$qProvider, 
	$provide, 
	$httpProvider,
	uiSelectConfig/*,
	cfpLoadingBarProvider*/){
	var allowed = ['edit', 'add'];
	/*cfpLoadingBarProvider.includeSpinner = true;*/

	//Satellizer login url
	/*$authProvider.loginUrl = '/api/authenticate';*/

	//Global theme for ui-select - tagging drop down
	uiSelectConfig.theme = 'bootstrap';

	$stateProvider
	.state('parent', {
		templateUrl : 'home.html',
		controller: 'AdminHomeCtlr',
		abstract: true
	})

	.state('base', {
		url: '/',
		templateUrl : 'authentication/login.html',
		controller : 'AuthCtlr',
		data: {
			css: ['dist/css/main.css', 'dist/css/kache-app.css']
		}
	})

	.state('login', {
		url: '/login',
		templateUrl : 'authentication/login.html',
		controller : 'AuthCtlr',
		data: {
			css: ['dist/css/main.css', 'dist/css/kache-app.css']
		}
	})

	.state('resetlink', {
		url: '/password/email',
		templateUrl : 'authentication/email.html',
		controller : 'ResetEmailCtlr',
		data: {
			css: ['dist/css/gentelella-admin.css', 'dist/css/main.css']
		}
	})

	.state('signup', {
		url: '/signup',
		templateUrl : 'authentication/signup.html',
		controller : 'SignupCtlr',
		data: {
			css: ['dist/css/gentelella-admin.css', 'dist/css/main.css', 'dist/css/kache-app.css']
		}
	})

	.state('parent.homeState', {
		url: '/home',
		templateUrl : 'dashboard/dashboard.html',
		controller: 'Dashboard',
		data: {
			css: ['dist/css/gentelella-admin.css', 'dist/css/kache-app.css']
		}
	})

	.state('parent.addSponsor', {
		url: '/sponsor/add',
		templateUrl : 'sponsors/add.html',
		controller: 'AddSponsor',
		data: {
			css: ['dist/css/gentelella-admin.css', 'dist/css/kache-app.css']
		}
	})

	.state('parent.viewSponsor', {
		url: '/sponsors/view',
		templateUrl : 'sponsors/view.html',
		controller: 'ViewSponsors',
		data: {
			css: ['dist/css/gentelella-admin.css', 'dist/css/kache-app.css']
		}
	});

	$urlRouterProvider.otherwise('/');

	function redirectWhenLoggedOut($q, $injector){
		return {
			responseError: function(rejection){
				var $state = $injector.get('$state');
				var rejectReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid'];
				angular.forEach(rejectReasons, function(value, key){
					if(rejection.data.error === value){
						localStorage.removeItem('user');
						$state.go('login');
					}
				});
				return $q.reject(rejection);
			}
		}
	}

	$provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);

	$httpProvider.interceptors.push('redirectWhenLoggedOut');

	$qProvider.errorOnUnhandledRejections(false);

	$locationProvider.html5Mode(true);

});

kacheApp.run(function($rootScope, $state, utilityService, $document, $http){
	//Make all posts to send this content type because laravel cries foul with json
	$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
		//console.log("Event "+event);
		/*console.log("tostate "+JSON.stringify(toState));
		console.log("toparams "+JSON.stringify(toParams));
		console.log("fromstate "+JSON.stringify(fromState));
		console.log("fromparams "+JSON.stringify(fromParams));*/
		var user = JSON.parse(localStorage.getItem('user'));
		if(user) {
			$rootScope.authenticated =true;
			$rootScope.currentUser = user;
			if(toState.name == 'auth') {
				event.preventDefault();
				$state.go('homeState');
			}
		}else {
			//UNCOMMENT THIS TO BLOCK ALL PAGES FOR A GUEST
			// event.preventDefault();
			// utilityService.notify('Please Login', 'danger');
			// $state.go('login');
		}
	});

	$rootScope.$on('$stateChangeSuccess', function(event, toState){
		$document[0].body.scrollTop = $document[0].documentElement.scrollTop = 0;
	});
});