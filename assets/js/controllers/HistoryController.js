kacheApp.controller('HistoryCtrl', function(
	$scope, 
	TranslateLanguage, 
	appFtry, 
	Lo, 
	$q,
	utilityService,
	$timeout){
	var vm = $scope;
	vm.words = [];

	vm.getFromServer = function(){
		return TranslateLanguage.get();
	}

	var promise = vm.getFromServer();
	promise.then(function(res){
		vm.words = res.data.data;
	}, function(){
		vm.words = [];
	});
	
});