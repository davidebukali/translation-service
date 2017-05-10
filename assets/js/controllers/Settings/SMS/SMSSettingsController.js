kacheApp.controller('SMSSetting', function($scope, $state, utilityService) {
	$scope.reminderSettings = {};
	$scope.buySMS = {};
	
	$scope.addCreditor = function(){
		utilityService.validateForm('#smsReminderSettings :input', function($form, event){
			event.preventDefault();
			$scope.payload.date_of_birth = $('#dob').val().trim();
			httpService.post('api/clients', $scope.payload).then(function(response){
				console.log("Add creditor success "+JSON.stringify(response));
			}).fail(function(error){
				console.log("Add creditor Error "+JSON.stringify(error));
			});

			
			//$state.go('viewCreditor');
		});
	}
});