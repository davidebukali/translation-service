kacheApp.controller('AddPerms', function(RolesAndPermissionService, appFtry, $scope, $state, utilityService, $stateParams, Lo) {
	var vm = $scope;
	vm.payload = {};
	vm.cancelClassname = "";
	vm.cancelTitle = "Cancel";
	vm.pageTitle = $stateParams.task == 'add' ? 'Add' : 'Edit';

	//If we are editing fill up the form with relevant values
	//otherwise empty the form
	areWeEditingOrAdding();

	function areWeEditingOrAdding(){
		if(vm.pageTitle == 'Edit'){
			vm.categorySelect = true;
			var permission = appFtry.getDataById('permissions', $stateParams.id);
			vm.payload = {
				name: permission.name,
				display_name: permission.display_name,
				description: permission.description,
				category: utilityService.lowercaseFirstLetter(permission.category)
			};
			originalPerm = Lo.clone(vm.payload);
		}else{
			vm.categorySelect = false;
			vm.payload = {};
		}
	}

	vm.managePerms = function($event){
		utilityService.validateForm('.addPermissionForm :input').then(function($form, event){
			event.preventDefault();
			var loadingBtn = angular.element($event.currentTarget);
			loadingBtn.button('loading');
			if($stateParams.task == 'add'){
				add(loadingBtn);
			}else{
				update(loadingBtn);
			}
		});
	}

	function add(loadingBtn){
		loadingBtn.button('loading');
		RolesAndPermissionService.addPermission(vm.payload).then(function(response){
			handleAddResponse(response);
			loadingBtn.button('reset');
		},function(error){
			utilityService.notify('Please contact Kachloan Customer Service For Assistance - '+error.statusText, 'danger');
			loadingBtn.button('reset');
		});
	}

	function handleAddResponse(response){
		if(response.data.success){
			utilityService.notify("Added Permission - " + vm.payload.name, 'success');
			vm.payload = {};
			vm.myForm.$setPristine();
		}else{
			utilityService.notify('Information - '+response.data.errormsg, 'info');
		}
	}

	function update(loadBtn){
		if(Lo.isEqual(originalPerm, vm.payload)){
			utilityService.notify('<i class="fa fa-info medium-font"></i>   There were no updates detected to save', 'info');
			loadBtn.button('reset');
		}else{
			RolesAndPermissionService.updatePermission($stateParams.id, vm.payload).then(function(response){
				handleUpdateResponse(response);
				loadBtn.button('reset');
			}, function(error){
				utilityService.notify('Please contact Kachloan Customer Service For Assistance - '+error.statusText, 'danger');
				loadBtn.button('reset');
			});
		}
	}

	function handleUpdateResponse(response){
		if(response.data.success){
			utilityService.notify("Updated Permission  - " + vm.payload.name, 'success');
			originalPerm = vm.payload;
			appFtry.resetData('permissions');
			appFtry.resetData('rolePermissions');
			$state.go('setPermissions');
		}else{
			utilityService.notify('<i class="fa fa-info medium-font"></i>  Permission cannot be updated now, '+response.data.errormsg, 'info');
		}
	}
});