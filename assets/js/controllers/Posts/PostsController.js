kacheApp.controller('ViewPostsCtlr', function(
	$scope,
	$state, 
	httpService, 
	utilityService, 
	appFtry,
	$stateParams,
	stateFactory,
	Lo
	){
	var vm = $scope;

	/******************
	
	Normal Posts Tab

	*******************/
	vm.pagination = {};
	vm.sponsoredPagination = {};

	vm.pagination.username = stateFactory.getAllData('manageSponsoredPosts').uname;
	vm.pagination.postsData = appFtry.getAllData('posts');
	vm.sponsoredPagination.postsData = appFtry.getAllData('posts');
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

	/******************
	
	Sponsored Posts Tab

	*******************/

	vm.sponsoredPagination.username = stateFactory.getAllData('manageSponsoredPosts').uname;
	console.log("Our data is "+JSON.stringify(vm.sponsoredPagination.postsData[0]));	
	vm.sponsoredPaginationLength = vm.sponsoredPagination.postsData.length;
	vm.sponsoredPagination.counter = 1;

	vm.nextPage = function(){
		vm.sponsoredPagination.counter = vm.sponsoredPagination.counter + 1;		
		var index = vm.sponsoredPagination.counter-1;
		vm.sponsoredPagination.actualPosts = vm.sponsoredPagination.postsData[index];
		toggleActiveClass('.pager-'+index);
	}

	vm.previousPage = function(){
		vm.sponsoredPagination.counter = vm.sponsoredPagination.counter - 1;	
		var index = vm.sponsoredPagination.counter-1;
		vm.sponsoredPagination.actualPosts = vm.sponsoredPagination.postsData[index];	
		toggleActiveClass('.pager-'+index);
	}

	vm.sponsoredPagination.buttonClick = function(index, event){
		toggleActiveClass(event.currentTarget);
		vm.sponsoredPagination.counter = index + 1;
		vm.sponsoredPagination.actualPosts = vm.sponsoredPagination.postsData[index];		
	}


	function init(index){
		vm.pagination.actualPosts = vm.pagination.postsData[index-1];
		vm.sponsoredPagination.actualPosts = filterSponsorPosts(vm.sponsoredPagination.postsData[index-1]);
	}

	function toggleActiveClass(element){
		var activePager = $(element);
		activePager.parent().children().removeClass('active');
		activePager.addClass('active');
	}

	function filterSponsorPosts(data){
		var sponsoredPosts =  
		Lo.map(data, function(post){
			Lo.filter(post, function(item){
				console.log("Post "+JSON.stringify(item));
				return item.posttype == "1";
			});			
		});
		
		return sponsoredPosts;
	}

	vm.togglePost = function(action, event){
		var url = utilityService.getAppUrl()+'togglePosts.php',
		pid = $(event.currentTarget).attr('rel');
		httpService.post(url, {task: action, postid: pid}).then(function(response){
			console.log("response "+JSON.stringify(response));
			refreshPosts();
		}, function(error){
			utilityService.notify('We are aware of this issue, send us an email if it persists - '+error.statusText, 'danger');
		});		
	}

	function refreshPosts(){
		var data = {
			uid: stateFactory.getAllData('manageSponsoredPosts').uid
		},
		url = utilityService.getAppUrl()+'getMyPosts.php';
		httpService.post(url, data).then(function(response){
			appFtry.setData('posts', response.data.posts);
			vm.pagination.postsData = appFtry.getAllData('posts');
			var index = vm.pagination.counter - 1;
			vm.pagination.actualPosts = vm.pagination.postsData[index];
			toggleActiveClass('.pager-'+index);
		}, function(error){
			utilityService.notify('We are aware of this issue, send us an email if it persists - '+error.statusText, 'danger');
		});
	}

});