kacheApp.service('CollateralService', function(httpService) {

	var addCollateralType = function addCollateralType(payload) {
		return httpService.post('api/collateral-type', payload);
	}

	var getCollateralType = function getCollateralType(){
		return httpService.get('api/collateral-type');
	}

	var getBranchesAvailableByCollateralTypeId = function getBranchesAvailableByCollateralTypeId(payload){
		return httpService.post('api/collateral-branch-pivot', payload);
	}

	var updateCollateralType = function updateCollateralType(id, updates){
		return httpService.put('api/collateral-type/'+id, updates);
	}

	var deleteCollateralType = function deleteCollateralType(id){
		return httpService.delete('api/collateral-type/'+id);
	}

	var addCollateral = function addCollateral(payload) {
		return httpService.post('api/permissions', payload);
	}

	var getCollateral = function getCollateral(){
		return httpService.get('api/permissions/');
	}

	var updateCollateral = function updateCollateral(id, updates){
		return httpService.put('api/permissions/'+id, updates);
	}

	var deleteCollateral = function deleteCollateral(id){
		return httpService.delete('api/permissions/'+id);
	}

	return({
		add: addCollateralType,
		get: getCollateralType,
		update: updateCollateralType,
		delete: deleteCollateralType,
		getBranchList: getBranchesAvailableByCollateralTypeId,
		
		addCollateral: addCollateral,
		getCollateral: getCollateral,
		updateCollateral: updateCollateral,
		deleteCollateral: deleteCollateral
	});
});