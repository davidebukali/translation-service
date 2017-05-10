kacheApp.controller('AddEditRolesCtrl', function($scope, utilityService, RolesAndPermissionService, $stateParams, appFtry, Lo, $state) {
	var vm = $scope;
	var originalRole;
	vm.payload = {};
	vm.cancelClassname = "";
	vm.cancelTitle = "Cancel";
	vm.pageTitle = $stateParams.manage == 'add' ? 'Add' : 'Edit';
	
	//If we are editing fill up the form with relevant values
	//otherwise empty the form
	areWeEditingOrAdding();

	function areWeEditingOrAdding(){
		if(vm.pageTitle=='Edit'){
		var role = appFtry.getDataById('roles', $stateParams.editId);
		vm.payload = {
			name: role.name,
			display_name: role.display_name,
			description: role.description
		};
		originalRole = Lo.clone(vm.payload);
		}else{
			vm.payload = {};
		}
	}

	vm.manage = function($event){
		utilityService.validateForm('.manageRoleForm :input').then(function($form, event){
			event.preventDefault();
			var loadingBtn = angular.element($event.currentTarget);
			loadingBtn.button('loading');
			if($stateParams.manage == 'add'){
				addRole(loadingBtn);
			}else{
				updateRole(loadingBtn);
			}
		});
	}

	function addRole(loadBtn){
		RolesAndPermissionService.addRole(vm.payload).then(function(response){
			handleAddResponse(response);
			loadBtn.button('reset');
		}, function(error){
			utilityService.notify('Please contact Kachloan Customer Service For Assistance - '+error.statusText, 'danger');
			loadBtn.button('reset');
		});
	}

	function updateRole(loadBtn){
		if(Lo.isEqual(originalRole, vm.payload)){
			utilityService.notify('<i class="fa fa-info medium-font"></i>   There were no updates detected to save', 'info');
			loadBtn.button('reset');
		}else{
			RolesAndPermissionService.updateRoles($stateParams.editId, vm.payload).then(function(response){
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
			utilityService.notify("Updated Role  - " + vm.payload.name, 'success');
			originalRole = vm.payload;
			appFtry.resetData('roles');
			$state.go('roles');
		}else{
			utilityService.notify('<i class="fa fa-info medium-font"></i>  Role cannot be updated now, '+response.data.errormsg, 'info');
		}
	}

	function handleAddResponse(response){
		if(response.data.success){
			utilityService.notify("Added Role - " + vm.payload.name, 'success');
			vm.payload = {};
			vm.myForm.$setPristine();
		}else{
			utilityService.notify('Information - '+response.data.errormsg, 'info');
		}
	}

});