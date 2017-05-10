kacheApp.controller('AdminHomeCtlr', function(
	$rootScope, 
	httpService, 
	utilityService, 
	adminSidebarService, 
	$scope, 
	$state
	){
	var vm = $scope;
	vm.menuToggle = function(){
		adminSidebarService.toggleMenu();
	}
	
	vm.logout = function($event) {
	
	}
});