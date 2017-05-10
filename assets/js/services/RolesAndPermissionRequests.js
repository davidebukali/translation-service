kacheApp.service('RolesAndPermissionService', function(httpService) {

	var addRole = function addRole(payload) {
		return httpService.post('api/roles', payload);
	}

	var getRoles = function getRoles(){
		return httpService.get('api/roles');
	}

	var updateRoles = function updateRoles(id, updates){
		return httpService.put('api/roles/'+id, updates);
	}

	var deleteRoles = function deleteRoles(id){
		return httpService.delete('api/roles/'+id);
	}

	var addPermission = function addPermission(payload) {
		return httpService.post('api/permissions', payload);
	}

	var getPermissions = function getPermissions(){
		return httpService.get('api/permissions/');
	}

	var updatePermission = function updatePermission(id, updates){
		return httpService.put('api/permissions/'+id, updates);
	}

	var deletePermission = function deletePermission(id){
		return httpService.delete('api/permissions/'+id);
	}

	var attachPermission = function attachPermission(payload){
		return httpService.post('api/attach-permission', payload);
	}	

	return({
		addRole: addRole,
		getRoles: getRoles,
		updateRoles: updateRoles,
		deleteRoles: deleteRoles,
		
		addPermission: addPermission,
		getPermissions: getPermissions,
		updatePermission: updatePermission,
		deletePermission: deletePermission,
		attachPermission: attachPermission
	});
});