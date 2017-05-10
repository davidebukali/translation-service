kacheApp.service('BranchService', function(httpService) {

	var addBranch = function addBranch(payload) {
		return httpService.post('api/branch', payload);
	}

	var getBranch = function getBranch(){
		return httpService.get('api/branch');
	}

	var updateBranch = function updateBranch(id, updates){
		return httpService.put('api/branch/'+id, updates);
	}

	var deleteBranch = function deleteBranch(id){
		return httpService.delete('api/branch/'+id);
	}

	return({		
		addBranch: addBranch,
		getBranch: getBranch,
		updateBranch: updateBranch,
		deleteBranch: deleteBranch
	});
});