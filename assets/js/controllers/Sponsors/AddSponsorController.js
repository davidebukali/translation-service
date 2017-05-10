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
	vm.addSponsor = function(file){
		vm.payload.file = file;
		vm.payload.thumb = "thumb";
		file.upload = Upload.upload({
			url: 'http://imagevibez.com/church/sponsorSignup.php',
			data: vm.payload
		});

		file.upload.then(function (response) {
			$timeout(function () {
				file.result = response.data;
				console.log("Success "+JSON.stringify(response.data));
			});
		}, function (response) {
			if (response.status > 0)
				$scope.errorMsg = response.status + ': ' + response.data;
		}, function (evt) {
	      // Math.min is to fix IE which reports 200% sometimes
	      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
	    });
		
		/*
		var addButton = $(event.currentTarget);

		if(vm.payload.uname && vm.payload.txtemail && vm.payload.txtpass){
			addButton.button('loading');
			var link = 'http://imagevibez.com/church/postSponsor.php';
			httpService.post(link, vm.payload).then(function(response){
				if(response.data.success == 1){
					console.log("Add sponsor success ");
					utilityService.notify('Added Sponsor', 'success');
				}else{
					console.log("Add sponsor fail "+response.data.message);
				}
				
				clearForm();

				addButton.button('reset');
			}, function(error){
				clearForm();

				console.log("Add sponsor Error "+JSON.stringify(error));
				addButton.button('reset');

				utilityService.notify('Cannot Add Sponsor', 'danger');
			});
		}else {
			utilityService.notify('All fields required', 'info');
		}*/
	}

	function clearForm(){
		vm.payload.uname = "";
		vm.payload.txtemail = "";
		vm.payload.txtpass = "";
	}

});