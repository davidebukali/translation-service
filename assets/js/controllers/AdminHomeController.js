kacheApp.controller('AdminHomeCtlr', function(
	adminSidebarService, 
	$scope
	){
	var vm = $scope;
	
	vm.menuToggle = function(){
		adminSidebarService.toggleMenu();
	}
	
});