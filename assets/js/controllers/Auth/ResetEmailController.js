kacheApp.controller('ResetEmailCtlr', function($scope, httpService, utilityService){
	var vm = $scope;

	vm.resetPassword = function(event){
		var btn = $(event.currentTarget),
		url = 'http://localhost/zion-server/forgotpass.php';
		//url = 'http://imagevibez.com/church/forgotpass.php';
		btn.button('loading');
		if (vm.email) {
			httpService.post(url, {'txtemail': vm.email}).then(function(response){
				console.log("response "+JSON.stringify(response));
				utilityService.notify(response.data.message, 'info');
				btn.button('reset');
			}, function(error){
				console.log("erro response "+JSON.stringify(error));
				btn.button('reset');
			});
		}else {
				btn.button('reset');
		}
		
	}
});