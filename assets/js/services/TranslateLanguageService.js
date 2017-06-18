kacheApp.service('TranslateLanguage', function(httpService) {
	var key = 'trnsl.1.1.20170618T002653Z.5444f9ae8504462a.a6b01b7cf1e0dad825b68caca80b542b5b2b8117';

	var add = function add(payload) {
		payload.key = key;
		return httpService.post('api/', payload);
	}

	var getLanguages = function getLanguages(chooseLanguage){
		return httpService.post('https://translate.yandex.net/api/v1.5/tr.json/getLangs?ui='+chooseLanguage+'&key='+key, {});
	}

	var update = function update(id, updates){
		return httpService.put('api//'+id, updates);
	}

	var del = function del(id){
		return httpService.delete('api//'+id);
	}

	return({		
		add: add,
		get: getLanguages,
		update: update,
		delete: del
	});
});