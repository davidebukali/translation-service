kacheApp.service('TranslateLanguage', function(httpService) {
	var key = 'trnsl.1.1.20170618T002653Z.5444f9ae8504462a.a6b01b7cf1e0dad825b68caca80b542b5b2b8117';

	var translateText = function translateText(fromTo, text) {
		return httpService.post('https://translate.yandex.net/api/v1.5/tr.json/translate?lang='+fromTo+'&text='+text+'&key='+key, {});
	}

	var getLanguages = function getLanguages(chooseLanguage){
		return httpService.post('https://translate.yandex.net/api/v1.5/tr.json/getLangs?ui='+chooseLanguage+'&key='+key, {});
	}

	return({		
		getLanguages: getLanguages,
		translate: translateText
	});
});