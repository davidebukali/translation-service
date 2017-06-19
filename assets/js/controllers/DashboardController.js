kacheApp.controller('Dashboard', function(
	$scope, 
	TranslateLanguage, 
	appFtry, 
	Lo, 
	$q,
	utilityService,
	$timeout){
	var vm = $scope;
	vm.showResults = false;
	vm.showError = false;
	vm.selectedOriginValue = 'en';
	vm.selectedTranslatedValue = 'sw';
	vm.originLanguages = appFtry.getAllData('languages');
	vm.textToBeTranslated = "";

	vm.translate = function(){
		var defer = $q.defer();
		var fromTo = vm.selectedOriginValue+'-'+vm.selectedTranslatedValue;
		if(vm.textToBeTranslated){
			//console.log("Text "+vm.textToBeTranslated);
			TranslateLanguage.translate(fromTo, vm.textToBeTranslated).then(function(res){
				console.log("Success Translation Response "+JSON.stringify(res.data));
				toggleResults(res.data);
				defer.resolve(res.data);
			}, function(err){
				// console.log("Error Didnot Translate "+JSON.stringify(err));
				vm.showError = true;
				defer.reject();
			});
		}else{
			//console.log("My Validation Text ");
			$timeout(function(){
				vm.$apply(function(){defer.reject();});
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
			vm.showError = true;
			defer.reject();
		});
		return defer.promise;
	}

	vm.getLanguagesList();

	function setUpLanguages(){
		vm.originLanguages =  appFtry.getAllData('languages');
		//console.log("Lang Response "+JSON.stringify(vm.originLanguages));
	}

	vm.saveToServer = function(translatedText){
		var defer = $q.defer();
		var data = {
			'origText': vm.textToBeTranslated,
			'transText': translatedText,
			'origLang': vm.selectedOriginValue,
			'transLang': vm.selectedTranslatedValue
		};
		TranslateLanguage.save(data).then(function(res){
			defer.resolve(res.data);
		}, function(){
			defer.reject();
		});
		return defer.promise;
	}

	function toggleResults(data){
		vm.showError = false;
		if(data.code == 200){
			vm.showResults = true;	
			vm.results = data.text[0];
			vm.saveToServer(vm.results);
		}else{
			vm.showResults = false;	
			vm.results = "";
		}
	}
	
});