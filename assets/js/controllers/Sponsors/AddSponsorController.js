kacheApp.controller('AddSponsor', function(
	$scope,
	$state, 
	utilityService, 
	httpService, 
	Lo,
	Upload, 
	$timeout
	){
	var vm = $scope;
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
	}

});