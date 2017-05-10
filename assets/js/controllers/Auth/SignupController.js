kacheApp.controller('SignupCtlr', function($scope, httpService, utilityService, $state){
	
	var vm = $scope;
	vm.signup = {};
	vm.showPassword = true;
	
	vm.onFinishSteps = function(formData){
		console.log("signup data "+JSON.stringify(formData));
		httpService.post('api/register', formData).then(function(response){
			$state.go("login");
			utilityService.stickyNote('Account Status.', 'Welcome to Kachloans, we sent you an email with instructions to activate your account.', 'success');
		}, function(error){
			console.log(JSON.stringify(error));
		});
	}

	vm.togglePassword = function(){
		vm.showPassword = !vm.showPassword;
	}
});