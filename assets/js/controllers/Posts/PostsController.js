kacheApp.controller('PostsCtlr', function(
	$scope,
	$state, 
	httpService, 
	utilityService, 
	appFtry,
	$stateParams
	){
	var vm = $scope;
	vm.pagination = {};

	vm.pagination.username = $stateParams.uname;
	vm.pagination.postsData = appFtry.getAllData('posts');
	console.log("Our data is "+JSON.stringify(vm.pagination.postsData[0]));	
	vm.paginationLength = vm.pagination.postsData.length;
	vm.pagination.counter = 1;

	init(vm.pagination.counter);

	vm.next = function(){
		vm.pagination.counter = vm.pagination.counter + 1;		
		var index = vm.pagination.counter-1;
		vm.pagination.actualPosts = vm.pagination.postsData[index];
		toggleActiveClass('.pager-'+index);
	}

	vm.previous = function(){
		vm.pagination.counter = vm.pagination.counter - 1;	
		var index = vm.pagination.counter-1;
		vm.pagination.actualPosts = vm.pagination.postsData[index];	
		toggleActiveClass('.pager-'+index);
	}

	vm.pagination.buttonClick = function(index, event){
		toggleActiveClass(event.currentTarget);
		vm.pagination.counter = index + 1;
		vm.pagination.actualPosts = vm.pagination.postsData[index];		
	}

	function init(index){
		vm.pagination.actualPosts = vm.pagination.postsData[index-1];
	}

	function toggleActiveClass(element){
		var activePager = $(element);
		activePager.parent().children().removeClass('active');
		activePager.addClass('active');
	}

});