kacheApp.controller('ViewSponsors', function(
	stateFactory, 
	$scope, 
	utilityService, 
	httpService, 
	appFtry, 
	DTOptionsBuilder, 
	DTColumnBuilder, 
	$q, 
	$state
	){
	var vm = $scope;

	/*
	*
	*
	*
	* Fetch user table data using a deferred/promise
	*
	*/
	vm.dtOptions = DTOptionsBuilder.fromFnPromise(function(){
		var defer = $q.defer();
		var URL = utilityService.getAppUrl()+'getUsersByType.php';
		httpService.get(URL).then(function(response){
			appFtry.setData('sponsors', response.data.users);
			defer.resolve(appFtry.getAllData('sponsors'));
		}, function(error){
			utilityService.notify('We are aware of this problem, send us an email if it persists - '+error.statusText, 'danger');
		});
		return defer.promise;
	})
	.withPaginationType('simple_numbers')
	.withDisplayLength(10)
	.withBootstrap();

	/*
	*
	*
	*
	* User Table column definitions
	*
	*/
	vm.dtColumns = [
	DTColumnBuilder.newColumn('id').withTitle('&nbsp&nbsp&nbsp #').notSortable(),
	DTColumnBuilder.newColumn('pic').withClass('profileImage').withTitle('Profile Avatar').notSortable(),
	DTColumnBuilder.newColumn('uname').withTitle('Username'),
	DTColumnBuilder.newColumn('email').withTitle('Email').notSortable(),
	/*DTColumnBuilder.newColumn('bio').withTitle('Description').notSortable(),*/
	DTColumnBuilder.newColumn('viewposts').withTitle('User Posts').notSortable(),
	DTColumnBuilder.newColumn('manageBtn').withTitle('Manage').notSortable()
	];

	/*
	*
	*
	*
	* Edit button click handler
	*
	*/
	$(document).on('click', '.editUserButton', function(e){
		e.preventDefault();
		var id = $(this).attr('rel'), 
		stateFactoryDueForCaching = {
			editId: id,
			manage: 'edit'
		};
		stateFactory.setData('manageUser', stateFactoryDueForCaching);
		vm.$apply(function(){
			$state.go('parent.manageUser', stateFactoryDueForCaching); 
		});
	});

	/*
	*
	*
	*
	* Unblock user button click handler
	*
	*/
	$(document).on('click', '.enableUser', function(e){
		var id = $(this).attr('rel'),
		data = {
			'uid': id,
			'userstatus': 'Y'
		},
		url = utilityService.getAppUrl()+'toggleUsers.php';

		httpService.post(url, data).then(function(response){
			showBlockBtn(id);
			console.log("res "+JSON.stringify(response));
			loadBtn.button('reset');
		}, function(error){
			utilityService.notify('We are aware of this issue, send us an email if it persists - '+error.statusText, 'danger');
			loadBtn.button('reset');
		});
	});

	/*
	*
	*
	*
	* Block user button click handler
	*
	*/
	$(document).on('click', '.disableUser', function(e){
		e.preventDefault();
		var id = $(this).attr('rel'),
		data = {
			'uid': id,
			'userstatus': 'N'
		},
		url = utilityService.getAppUrl()+'toggleUsers.php';;

		httpService.post(url, data).then(function(response){
			hideBlockBtn(id);
			console.log("res "+JSON.stringify(response));
			loadBtn.button('reset');
		}, function(error){
			utilityService.notify('We are aware of this issue, send us an email if it persists - '+error.statusText, 'danger');
			loadBtn.button('reset');
		});
	});
	
	/*
	*
	*
	*
	* Hide or show block/unblock user buttons
	*
	*/
	function hideBlockBtn(id){
		$('.disableUserButton-'+id).addClass('hide');
		$('.enableUserButton-'+id).removeClass('hide');
	}

	function showBlockBtn(id){
		$('.disableUserButton-'+id).removeClass('hide');
		$('.enableUserButton-'+id).addClass('hide');
	}

	/*
	*
	*
	*
	* View list of all user posts
	*
	*/
	$(document).on('click', '.viewUserPostsButton', function(e){
		e.preventDefault();
		var id = $(this).attr('rel'),
		data = {
			'uid': id
		},
		url = utilityService.getAppUrl()+'getMyPosts.php',
		user = appFtry.getDataById('sponsors', id);

		httpService.post(url, data).then(function(response){
			appFtry.setData('posts', response.data.posts);
			$state.go('parent.viewUserPosts', {uname: user.uname, uid: id});
		}, function(error){
			utilityService.notify('We are aware of this issue, send us an email if it persists - '+error.statusText, 'danger');
		});
	});

	
	vm.dtInstance = {};
	vm.dtInstanceCallback = dtInstanceCallback;

	/*
	*
	*
	*
	* Reload table data
	*
	*/
	function reloadTableData(){
		var resetPaging = true;
		vm.dtInstance.reloadData(function(json){
			console.log("reloading "+json);
		}, resetPaging);
	}

	function dtInstanceCallback(dt){
		vm.dtInstance = dt;
	}
});