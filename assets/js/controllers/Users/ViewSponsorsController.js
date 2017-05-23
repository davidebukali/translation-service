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

	vm.dtOptions = DTOptionsBuilder.fromFnPromise(function(){
		var defer = $q.defer();
				//var URL = 'http://imagevibez.com/church/getUsersByType.php';
				var URL = 'http://localhost/zion-server/getUsersByType.php';

				httpService.get(URL).then(function(response){
					appFtry.setData('sponsors', response.data.users);

					var sponsorData = appFtry.getAllData('sponsors');

					defer.resolve(sponsorData);
				}, function(error){
					utilityService.notify('We are aware of this problem, send us an email if it persists - '+error.statusText, 'danger');
				});
				return defer.promise;
			}).withPaginationType('simple_numbers')
	.withDisplayLength(10)
	.withBootstrap();
	vm.dtColumns = [
	DTColumnBuilder.newColumn('id').withTitle('&nbsp&nbsp&nbsp #').notSortable(),
	DTColumnBuilder.newColumn('pic').withClass('profileImage').withTitle('Profile Avatar').notSortable(),
	DTColumnBuilder.newColumn('uname').withTitle('Username'),
	DTColumnBuilder.newColumn('email').withTitle('Email').notSortable(),
	/*DTColumnBuilder.newColumn('bio').withTitle('Description').notSortable(),*/
	DTColumnBuilder.newColumn('viewposts').withTitle('User Posts').notSortable(),
	DTColumnBuilder.newColumn('manageBtn').withTitle('Manage').notSortable()
	];

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

	$(document).on('click', '.enableUser', function(e){
		var id = $(this).attr('rel'),
		data = {
			'uid': id,
			'userStatus': 'Y'
		},
		url = 'http://localhost/zion-server/editUser.php';

		httpService.post(url, data).then(function(response){
			/*deleteRoleResponse(response);*/
			toggleBlockBtns(id);
			console.log("res "+JSON.stringify(response));
			loadBtn.button('reset');
		}, function(error){
			utilityService.notify('We are aware of this issue, send us an email if it persists - '+error.statusText, 'danger');
			loadBtn.button('reset');
		});
	});

	$(document).on('click', '.disableUser', function(e){
		e.preventDefault();
		var id = $(this).attr('rel'),
		data = {
			'uid': id,
			'userStatus': 'N'
		},
		url = 'http://localhost/zion-server/editUser.php';

		httpService.post(url, data).then(function(response){
			/*deleteRoleResponse(response);*/
			toggleBlockBtns(id);
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
	* View list of all user posts*/
	$(document).on('click', '.viewUserPostsButton', function(e){
		e.preventDefault();
		var id = $(this).attr('rel'),
		data = {
			'uid': id
		},
		url = 'http://localhost/zion-server/getMyPosts.php',
		user = appFtry.getDataById('sponsors', id);

		httpService.post(url, data).then(function(response){
			appFtry.setData('posts', response.data.posts);
			$state.go('parent.viewUserPosts', {uname: user.uname});
		}, function(error){
			utilityService.notify('We are aware of this issue, send us an email if it persists - '+error.statusText, 'danger');
		});
	});

	function toggleBlockBtns(id){
		$('.disableUserButton-'+id).toggleClass('hide');
		$('.enableUserButton-'+id).toggleClass('hide');
	}

	function deleteRoleResponse(response){
		reloadTableData();
		if(response.data.success){
			utilityService.notify("Deleted Role - " + vm.payload.name, 'success');
		}else{
			utilityService.notify('Information - '+response.data.errormsg, 'info');
		}
	}

	vm.dtInstance = {};
	vm.dtInstanceCallback = dtInstanceCallback;
	function reloadTableData(){
		var resetPaging = true;
		vm.dtInstance.reloadData(function(json){
			console.log("reloading "+json);
		}, resetPaging);
	}

	function dtInstanceCallback(dt){
		console.log("Instance callback");
		vm.dtInstance = dt;
	}
});