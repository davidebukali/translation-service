kacheApp.service('StaffService', function(httpService) {

	var addStaff = function addStaff(payload) {
		return httpService.post('api/staff', payload);
	}

	var getStaff = function getStaff(){
		return httpService.get('api/staff');
	}

	var getStaffByOrganisation = function getStaffByOrganisation(id){
		return httpService.get('api/organisation-users/'+id);
	}

	var updateStaff = function updateStaff(id, updates){
		return httpService.put('api/staff/'+id, updates);
	}

	var deleteStaff = function deleteStaff(id){
		return httpService.delete('api/staff/'+id);
	}

	return({
		addStaff: addStaff,
		getStaff: getStaff,
		updateStaff: updateStaff,
		deleteStaff: deleteStaff,
		getStaffByOrganisation: getStaffByOrganisation
	});
});