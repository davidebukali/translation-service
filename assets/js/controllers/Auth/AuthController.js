kacheApp.controller('AuthCtlr', function(
	$scope,
	$state, 
	httpService, 
	$rootScope, 
	utilityService, 
	$window,
	auth
	){
	var vm = $scope;
	vm.login = function($event) {
		var loginBtn = angular.element($event.currentTarget);
		loginBtn.button('loading');

		auth.login(vm.email, vm.password).then(function(user){
			utilityService.showLoadingPage("Loading");
			console.log('User is '+JSON.stringify(user));
			localStorage.setItem('user', user.uname);
			localStorage.setItem('userPic', user.profilePic);
			$rootScope.authenticated = true;
			$rootScope.currentUser = user;
			$state.go('parent.homeState');
		}).fail(function(error){
			loginBtn.button('reset');
			var error = error;
			if(error == undefined){
				vm.loginError = true;
				vm.loginErrorText = error;
				utilityService.notify(error, 'danger');
			}else if(error.indexOf('null') != -1) {
				utilityService.notify("Please check internet connection", 'danger');
			}else{
				utilityService.notify(error, 'danger');
			}
		});
	}

});