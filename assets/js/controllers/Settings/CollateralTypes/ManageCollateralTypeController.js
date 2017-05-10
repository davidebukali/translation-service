kacheApp.controller('ManageCollateralTypes', function(
	$scope, 
	utilityService, 
	$stateParams, 
	appFtry, 
	Lo, 
	$state,
	CollateralService
	){
	
	var vm = $scope,
	originalCollateral;

	//Load branches formated to suit the tagging select element
	utilityService.activateTags('branches', 'branch_name').then(function(response){
		vm.branchesArray = response;
	});

	//ui-select angular directive setup data
	vm.closeOnSelect = false;
	vm.validateCollateralType = false;

	//Form data object
	vm.payload = {};

	//Page title
	vm.pageTitle = $stateParams.manage === 'add' ? 'Add' : 'Edit';

	console.log('Page title is '+vm.pageTitle);
	
	//If we are editing fill up the form with relevant values
	//otherwise empty the form
	areWeEditingOrAdding();
	function areWeEditingOrAdding(){
		if(vm.pageTitle=='Edit'){
			var collateral = appFtry.getDataById('collateralType', $stateParams.editId);
			//console.log("collateralType "+JSON.stringify(role) + " edit id "+$stateParams.editId);
			utilityService.loadBranchAvailability($stateParams.editId).then(function(matchedBranches){
				vm.payload = {
					name: collateral.name,
					description: collateral.description,
					branch: matchedBranches
				};
				originalCollateral = Lo.clone(vm.payload);
			});
		}else{
			vm.payload = {};
		}
	}

	vm.manage = function($event){				
		var loadingBtn = angular.element($event.currentTarget);
		loadingBtn.button('loading');
		validateBranchAvailability(loadingBtn);
		utilityService.validateForm('.manageCollateralTypeForm :input')
		.then(function($form, event){
			event.preventDefault();
			loadingBtn.button('loading');
			if (validateBranchAvailability(loadingBtn)) {
				if($stateParams.manage == 'add'){
					addCollateralType(loadingBtn);
				}else{
					updateCollateralType(loadingBtn);
				}
			}
		});
	}

	function validateBranchAvailability(loadingBtn){
		var valid = true;
		if (vm.payload.branch == undefined || vm.payload.branch.length === 0) {
			valid = false;
			vm.validateCollateralType = true;
		}else{
			vm.validateCollateralType = false;
		}
		loadingBtn.button('reset');
		return valid;
	}

	function addCollateralType(loadBtn){
		var data = formatAddCollateralPayload();
		loadBtn.button('loading');
		CollateralService.add(data).then(function(response){
			loadBtn.button('reset');
			handleAddResponse(response);
		}, function(error){
			utilityService.notify('Please contact Kachloan Customer Service For Assistance - '+error.statusText, 'danger');
			loadBtn.button('reset');
		});
	}

	function formatAddCollateralPayload(){
		return {
			'name': vm.payload.name,
			'branch': Lo.map(vm.payload.branch, 'id'),
			'description': vm.payload.description
		};
	}

	function handleAddResponse(response){
		if(response.data.success){
			utilityService.notify("Added Collateral Type - " + vm.payload.name, 'success');
			vm.payload = {};
			vm.myForm.$setPristine();
		}else{
			utilityService.notify('Information - '+response.data.errormsg, 'info');
		}
	}

	function updateCollateralType(loadBtn){
		var data = formatAddCollateralPayload();
		loadBtn.button('loading');
		if(Lo.isEqual(originalCollateral, vm.payload)){
			utilityService.notify('<i class="fa fa-info medium-font"></i>   There were no updates detected to save', 'info');
			loadBtn.button('reset');
		}else{
			CollateralService.update($stateParams.editId, data).then(function(response){
				handleUpdateResponse(response);
				loadBtn.button('reset');
			}, function(error){
				utilityService.notify(error.statusText, 'danger');
				loadBtn.button('reset');
			});
		}
	}

	function handleUpdateResponse(response){
		if(response.data.success){
			utilityService.notify("Updated Collateral Type  - " + vm.payload.name, 'success');
			originalCollateral = vm.payload;
			$state.go('collateralType');
		}else{
			utilityService.notify('<i class="fa fa-info medium-font"></i>  Collateral cannot be updated now, '+response.data.errormsg, 'info');
		}
	}
});