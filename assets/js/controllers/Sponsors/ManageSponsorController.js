kacheApp.controller('ManageSponsorCtrl', function(
	$scope,
	$state, 
	utilityService, 
	httpService, 
	Lo,
	Upload, 
	$timeout,
	$stateParams,
	appFtry
	){

	var vm = $scope;
	var originalSponsor;
	vm.payload = {};
	vm.pageTitle = $stateParams.manage == 'add' ? 'Add' : 'Edit';
	
	//If we are editing fill up the form with relevant values
	//otherwise empty the form
	areWeEditingOrAdding();

	function areWeEditingOrAdding(){
		if(vm.pageTitle=='Edit'){
		var sponsor = appFtry.getDataById('sponsors', $stateParams.editId);
		vm.payload = {
			txtuname: sponsor.uname,
			txtemail: sponsor.email
		};
		originalSponsor = Lo.clone(vm.payload);
		}else{
			vm.payload = {};
		}
	}

	vm.manage = function($event){
		utilityService.validateForm('.manageSponsorForm :input').then(function($form, event){
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




	/*var vm = $scope;
	vm.payload = {};
	vm.addSponsor = function(event, file){
		var addButton = $(event.currentTarget);
		if(vm.payload.txtuname && vm.payload.txtemail && vm.payload.txtpass){
			addButton.button('loading');
			if(file){
				vm.payload.file = file;
				vm.payload.thumb = "thumb";
				uploadFile(file, addButton);
			}else {
				vm.payload.sponsor = "sponsor";
				var link = 'http://imagevibez.com/church/signup.php';
				uploadText(link, vm.payload, addButton);
			}
			
		}else {
			utilityService.notify('All fields required', 'info');
		}
	}

	function uploadText(url, data, btn){
		httpService.post(url, data).then(function(response){
			console.log("Success "+JSON.stringify(response));
			clearForm(btn)
		}, function(error){
			btn.button('reset');
		});
	}

	function uploadFile(file, btn){
		file.upload = Upload.upload({
			url: 'http://imagevibez.com/church/sponsorSignup.php',
			data: vm.payload
		});

		file.upload.then(function (response) {
			$timeout(function () {
				clearForm(addButton);
				file.result = response.data;
				console.log("Success "+JSON.stringify(response.data));
				utilityService.notify('Sponsor Account Created', 'success');
			});
		}, function (response) {
			btn.button('reset');
			if (response.status > 0)
				$scope.errorMsg = response.status + ': ' + response.data;
			utilityService.notify('Something went wrong, send us an email if it persists '+response.data, 'info');
		});
	}

	function clearForm(btn){
		vm.payload.txtuname = "";
		vm.payload.txtemail = "";
		vm.payload.txtpass = "";
		vm.picFile = !vm.picFile;
		btn.button('reset');
	}*/

});