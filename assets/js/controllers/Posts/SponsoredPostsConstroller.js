kacheApp.controller('ViewSponsored', function(
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
			var sponsor = appFtry.getDataById('sponsors', $stateParams.editId),
			u_type = sponsor.usertype == 'admin' ? 'admin' : 'user',
			u_status = sponsor.userStatus == 'Y' ? true : false;
			setActivateField(u_status);
			
			vm.payload = {
				uid: $stateParams.editId,
				txtuname: sponsor.uname,
				txtemail: sponsor.email,
				thumb: 'thumb',
				usertype: u_type,
				userstatus: "",
				txtpass: ""
			};
			//Set profile pic
			$('#addUserImg').attr('src', sponsor.picUrl);

			originalSponsor = Lo.clone(vm.payload);
			
		}else{
			vm.payload = {};
		}
	}

	function setActivateField(activateField){
		var field = $('.icheckbox_flat-green');
		if(activateField){
			field.addClass('checked active');
		}else {
			field.removeClass('checked active');
		}
	}

	vm.manage = function($event){
		utilityService.validateForm('.manageUserForm :input').then(function($form, event){
			event.preventDefault();
			var loadingBtn = angular.element($event.currentTarget);
			loadingBtn.button('loading');
			//Set user activate/deactivate field
			vm.payload.userstatus = checkActivateUserField() ? 'Y' : 'N';
			if($stateParams.manage == 'add'){
				addSponsor(loadingBtn);
			}else{
				updateSponsor(loadingBtn);
			}
		});
	}

	function addSponsor(addButton, file){		
		if(vm.myFile){
			var link = utilityService.getAppUrl()+'sponsorSignup.php';
			uploadFile(link, addButton);
		}else {
			vm.payload.sponsor = "sponsor";
			var link = utilityService.getAppUrl()+'signup.php';
			uploadText(link, vm.payload, addButton);
		}

	}

	function uploadText(url, data, btn){
		httpService.post(url, data).then(function(response){
			console.log("Success "+JSON.stringify(response));
			clearForm(btn);
			handleAddResponse(response);
		}, function(error){
			btn.button('reset');
		});
	}

	function uploadFile(url, btn) {
		var file = vm.myFile,
		fd = new FormData(),
		uploadUrl = url;

		fd.append('file', file);
		fd.append('uid', $stateParams.editId);
		fd.append('txtuname', vm.payload.txtuname);
		fd.append('txtemail', vm.payload.txtemail);
		fd.append('txtpass', vm.payload.txtpass);
		fd.append('thumb', 'thumb');
		fd.append('usertype', vm.payload.usertype);
		fd.append('userstatus', vm.payload.userstatus);

		fileUpload.uploadFileToUrl(uploadUrl, fd).then(function(res){
			console.log("Success");
			if (vm.pageTitle=='Edit') {
				handleUpdateResponse(res);
			} else {
				handleAddResponse(res, btn);
			}
			btn.button('reset');
		},function(err){
			console.log("error");
			btn.button('reset');
		});
	}

	function updateSponsor(loadBtn){
		if(Lo.isEqual(originalSponsor, vm.payload)){
			utilityService.notify('<i class="fa fa-info medium-font"></i>   No new updates detected to save', 'info');
			loadBtn.button('reset');
		}else{
		//console.log('Payload '+JSON.stringify(vm.payload));

		if(vm.myFile){
			console.log("We have a file");
			var url = utilityService.getAppUrl()+'editUserPic.php';
			uploadFile(url, loadBtn);
		}else{
			var url = utilityService.getAppUrl()+'editUser.php';
			updateText(url, loadBtn);
		}
	}
}

function updateText(url, loadBtn){
	httpService.post(url, vm.payload).then(function(response){
		console.log("Success "+JSON.stringify(response));
		handleUpdateResponse(response);
		loadBtn.button('reset');
	}, function(error){
		loadBtn.button('reset');
	});	
}

function checkActivateUserField(){
	var active = false;
	if($('.icheckbox_flat-green').hasClass('checked')){
		active = true;
	}else{
		active = false;
	}
	return active;
}

function handleUpdateResponse(response){
	if(response.data.success){
		utilityService.notify('<i class="fa fa-check medium-font"></i> User Updated', 'success');
		originalRole = vm.payload;
	}else{
		utilityService.notify('<i class="fa fa-exclamation-triangle medium-font"></i> User cannot be updated now, '+response.data.errormsg, 'info');
	}
}

function handleAddResponse(response, btn){
	if(response.data.success){
		utilityService.notify('<i class="fa fa-check medium-font"></i> User Added', 'success');
		vm.payload = {};
		clearForm(btn);
	}else{
		utilityService.notify('<i class="fa fa-exclamation-triangle medium-font"></i> Information - '+response.data.errormsg, 'info');
	}
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

});