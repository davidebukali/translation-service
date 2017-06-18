kacheApp.controller('Dashboard', function($scope, TranslateLanguage, appFtry, Lo, $q){
	var vm = $scope;
	vm.showResults = false;
	vm.originLanguages = [];
	vm.tranlatedLanguages = [];

	vm.translate = function(){
		//console.log('Translating');
		return 'Translating';
	}

	vm.getLanguagesList = function (){
		var defer = $q.defer();
		TranslateLanguage.get('en').then(function(res){
			//console.log("Success Loaded Language List Response "+JSON.stringify(res.data.data));
			if(!Lo.isUndefined(res.data.data.langs)){
				appFtry.setData('languages', res.data.data.langs);
				setUpLanguages();
				defer.resolve(res.data);
			}
		}, function(err){
			//console.log("Error Didnot Load List Response "+JSON.stringify(err.data));
			defer.reject();
		});
		return defer.promise;
	}

	function setUpLanguages(){
		vm.originLanguages = appFtry.getAllData('languages');
	}
	
});