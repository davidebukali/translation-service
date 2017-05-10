kacheApp.controller('AttachPermissionsToRoles', function($state, stateFactory, stateDetails, appFtry, $scope, utilityService, $stateParams, RolesAndPermissionService) {
	var vm = $scope;
	vm.roleId = loadState('paramId');
	vm.roleName = loadState('paramName');
	vm.object = Object;
	vm.active = false;
	vm.repeatEvent = "setPerms";

	loadPermissions();

	function loadPermissions(){
		RolesAndPermissionService.getPermissions().then(function(response){
			appFtry.setData('permissions', response.data.allpermissions);
			appFtry.setData('rolePermissions', response.data.allrolepermissions);
			vm.perms = utilityService.organisePermissions(appFtry.getAllData('permissions'), appFtry.getAllData('rolePermissions'), vm.roleId);
			//console.log("allpermissions "+JSON.stringify(response.data.allpermissions));
			//console.log("allrolepermissions "+JSON.stringify(response.data.allrolepermissions));
		}, function(error){
			utilityService.notify('Please contact Kachloan Customer Service For Assistance - '+error.statusText, 'danger');
		});
	}

	//Load permissions state for current role
	function loadState(key){
		var state = stateFactory.getAllData(stateDetails.self.name)[key];
		if(!state){
			$state.go('roles');
		}
		return state;
	}

	vm.attachPermissions = function(){
		var payload = getCheckedPermissions();
		console.log("Payload "+JSON.stringify(payload));
		RolesAndPermissionService.attachPermission(payload).then(function(response){
			console.log("Response Perms "+JSON.stringify(response.data));
			handleAttachResponse(response);
		}, function(error){
			utilityService.notify('Please contact Kachloan Customer Service For Assistance - '+error.statusText, 'danger');
		});
	}

	function handleAttachResponse(response){
		if(response.data.success){
			utilityService.notify(response.data.success, 'success');
		}else{
			utilityService.notify('Information - '+response.data.errormsg, 'info');
		}
	}

	function getCheckedPermissions(){
		var perms = [];
		$(".permissionNames").each(function(){
			if($(this).children('div.icheckbox_flat-green').hasClass('checked')){
				perms.push($(this).attr('rel'));
			}
		});
		return payload = {
			'roleid': vm.roleId,
			'permissions': perms
		};
	}

	vm.deletePermission = function(e){
		e.preventDefault();
    	var delButton = angular.element(e.target), 
    	id = delButton.attr('rel');
    	delButton.parent('p').parent('li').hide('fade');
    	RolesAndPermissionService.deletePermission(id).then(function(response){
			deletePermResponse(response);
			loadBtn.button('reset');
		}, function(error){
			utilityService.notify('Please contact Kachloan Customer Service For Assistance - '+error.statusText, 'danger');
			loadBtn.button('reset');
		});
	}

	function deletePermResponse(response){
        if(response.data.success){
            utilityService.notify("Deleted Permission - " + vm.payload.name, 'success');
        }else{
            utilityService.notify('Information - '+response.data.errormsg, 'info');
        }
    }

	//Initialise checkboxes when repeat complete event for categories is fired
	vm.$on('setPerms', function(){
		// iCheck
		$(document).ready(function() {
		  if ($("input[type='checkbox']")[0]) {
		    $(document).ready(function () {
		      $('input.flat').iCheck({
		        checkboxClass: 'icheckbox_flat-green',
		        radioClass: 'iradio_flat-green'
		      });
		    });
		  }		  
		});
		// iCheck
	});

	//Hide or show edit and delete permissions
	$(document).on({
		mouseenter: function(){
			$(this).children('.manage-perms').removeClass('hide');
		},
		mouseleave: function(){
			$(this).children('.manage-perms').addClass('hide');
		}
	}, '.permItem');
});