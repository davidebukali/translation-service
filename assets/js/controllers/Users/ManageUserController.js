kacheApp.controller('ManageUserCtrl', function(
	$scope,
	$state, 
	utilityService, 
	httpService, 
	Lo,
	$timeout,
	$stateParams,
	appFtry,
	fileUpload
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
			txtemail: sponsor.email,
			txtpass: sponsor.pwd
		};
		originalSponsor = Lo.clone(vm.payload);
		}else{
			vm.payload = {};
		}
	}

	vm.manage = function($event){
		console.log("Lego");
		utilityService.validateForm('.manageUserForm :input').then(function($form, event){
			event.preventDefault();
			console.log("yup Lego");
			var loadingBtn = angular.element($event.currentTarget);
			loadingBtn.button('loading');
			if($stateParams.manage == 'add'){
				addSponsor(loadingBtn);
			}else{
				updateSponsor(loadingBtn);
			}
		});
	}

	function addSponsor(addButton, file){		
		if(vm.myFile){
			uploadFile(addButton);
		}else {
			vm.payload.sponsor = "sponsor";
			var link = 'http://imagevibez.com/church/signup.php';
			uploadText(link, vm.payload, addButton);
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

	function uploadFile(btn) {
		var file = vm.myFile,
		fd = new FormData(),
		status = vm.payload.userStatus == true ? 'Y' : 'N',
		// uploadUrl = 'http://imagevibez.com/church/sponsorSignup.php';
		uploadUrl = 'http://localhost/zion-server/sponsorSignup.php';

		fd.append('file', file);
		fd.append('txtuname', vm.payload.txtuname);
		fd.append('txtemail', vm.payload.txtemail);
		fd.append('txtpass', vm.payload.txtpass);
		fd.append('thumb', 'thumb');
		fd.append('usertype', vm.payload.usertype);
		fd.append('status', status);

	//console.log("Payload "+JSON.stringify(vm.payload));

        fileUpload.uploadFileToUrl(uploadUrl, fd).then(function(res){
            console.log("Success");
            clearForm(btn)
            //btn.button('reset');
         },function(err){
            console.log("error");
            // clearForm(btn)
            btn.button('reset');
         });
	}

	function clearForm(btn){
		vm.payload.txtuname = "";
		vm.payload.txtemail = "";
		vm.payload.txtpass = "";
		vm.payload.usertype = "";
		vm.payload.userStatus = !vm.payload.userStatus;
		$('#addUserImg').attr('src', 'dist/img/user-icon.png');
		btn.button('reset');
		utilityService.resetFileInput($('#userimage'));
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
				vm.payload.sponsor = "thumb";
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

	*/

});