kacheApp.controller('ResetEmailCtlr', function($scope, httpService, utilityService){
	var vm = $scope;
	utilityService.validateForm('.resetLinkForm input', function($form, event){
		event.preventDefault();
		/*httpService.get('api/clients/list').then(function(response){
			vm.clients = response.data;
		}).fail(function(error){
			vm.clients = [];
		});*/
		console.log("Hola reset");
	});
});