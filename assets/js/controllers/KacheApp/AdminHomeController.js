kacheApp.controller('AdminHomeCtlr', function(
	$rootScope, 
	httpService, 
	utilityService, 
	adminSidebarService, 
	$scope, 
	$state
	){
	var vm = $scope;
	vm.username = localStorage.getItem('user');
	vm.profilePic = utilityService.simpleAvatarUrl(localStorage.getItem('userPic'));
	
	vm.menuToggle = function(){
		adminSidebarService.toggleMenu();
	}
	
	vm.logout = function($event) {
		localStorage.removeItem('user');
		localStorage.removeItem('userPic');
		$state.go('login');
	}
});