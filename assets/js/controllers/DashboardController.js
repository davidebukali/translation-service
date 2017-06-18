kacheApp.controller('Dashboard', function($scope, TranslateLanguage, appFtry, Lo, $q, $http){
	var vm = $scope,
	key = 'trnsl.1.1.20170618T002653Z.5444f9ae8504462a.a6b01b7cf1e0dad825b68caca80b542b5b2b8117';
	vm.showResults = false;
	vm.originLanguages = [];
	vm.tranlatedLanguages = [];

	vm.translate = function(){
		console.log('Translating');
		return 'Translating';
	}

	vm.getLanguagesList = function(){
		var defer = $q.defer();
		$http.post('https://translate.yandex.net/api/v1.5/tr.json/getLangs?ui=en&key='+key).then(function(res){
			console.log("Response "+JSON.stringify(res));
			if(!Lo.isUndefined(res.data.langs)){
				appFtry.setData('languages', res.data.langs);
				setUpLanguages();
				defer.resolve(res);
			}
		}, function(err){
			console.log("Error "+JSON.stringify(err));
			defer.reject();
		});
		return defer.promise;
	}

	function setUpLanguages(){
		vm.originLanguages = appFtry.getAllData('languages');
	}
	
});