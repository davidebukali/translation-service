kacheApp.controller('Dashboard', function(
	$scope, 
	TranslateLanguage, 
	appFtry, 
	Lo, 
	$q,
	utilityService){
	var vm = $scope;
	vm.showResults = false;
	vm.selectedOriginValue = 'en';
	vm.selectedTranslatedValue = 'sw';
	vm.originLanguages = appFtry.getAllData('languages');
	vm.tranlatedLanguages = [];
	vm.textToBeTranslated = "";

	vm.translate = function(){
		var defer = $q.defer(),
		fromTo = vm.selectedOriginValue+'-'+vm.selectedTranslatedValue;
		if(vm.textToBeTranslated){
			TranslateLanguage.translate(fromTo, vm.textToBeTranslated).then(function(res){
				console.log("Success Translation Response "+JSON.stringify(res.data));
				toggleResults(res.data);
				defer.resolve(res.data);
			}, function(err){
				//console.log("Error Didnot Load List Response "+JSON.stringify(err.data));
				defer.reject();
			});
		}
		
		return defer.promise;
	}

	vm.getLanguagesList = function (){
		var defer = $q.defer();
		TranslateLanguage.getLanguages('en').then(function(res){
			//console.log("Success Loaded Language List Response "+JSON.stringify(res.data));
			if(!Lo.isUndefined(res.data.langs)){
				var formatedLanguages = Lo.map(res.data.langs, function(value, prop) {
					return { 'id': prop, 'value': value };
				});
				appFtry.setData('languages', formatedLanguages);
				setUpLanguages();
				defer.resolve(res.data);
			}
		}, function(err){
			//console.log("Error Didnot Load List Response "+JSON.stringify(err.data));
			defer.reject();
		});
		return defer.promise;
	}

	vm.getLanguagesList();

	function setUpLanguages(){
		vm.originLanguages =  appFtry.getAllData('languages');
		//console.log("Lang Response "+JSON.stringify(vm.originLanguages));
	}

	function toggleResults(data){
		//{"code":200,"lang":"en-sw","text":["kuwapiga"]}
		
		if(data.code == 200){
			vm.showResults = true;	
			vm.results = data.text[0];
		}else{
			vm.showResults = false;	
			vm.results = "";
		}
	}
	
});