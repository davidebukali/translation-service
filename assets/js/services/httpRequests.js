kacheApp.service('httpService', function($http) {
	
	var getData = function getData(url) {
		return $http({	
			method: 'get',
			url: url
		});
	}

	var postFormData = function postFormData(url, formData){
		return $http({	
			method: 'post',
			url: url,
			data: formData,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		});
	}

	var putData = function putData(url, formData){
		return $http({	
			method: 'put',
			url: url,
			data: $.param(formData),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		});
	}

	var deleteData = function deleteData(url){
		return $http({	
			method: 'delete',
			url: url
		});
	}
	
	return({
		get: getData,
		post: postFormData,
		put: putData,
		delete: deleteData
	});
});