kacheApp.controller('AdminHomeCtlr', function(
	$rootScope, 
	httpService, 
	utilityService, 
	adminSidebarService, 
	$scope, 
	$state
	){
	var vm = $scope;
	/*vm.username = 
	vm.profilePic = 'dist/img/user-icon.png'
	*/
	vm.menuToggle = function(){
		adminSidebarService.toggleMenu();
	}
	
	vm.logout = function($event) {
		localStorage.removeItem('user');
		$state.go('/');
	}
});