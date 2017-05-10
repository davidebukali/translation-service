kacheApp.controller('ViewRoles', function(stateFactory, $scope, utilityService, RolesAndPermissionService, appFtry, DTOptionsBuilder, DTColumnBuilder, $q, $state) {
	var vm = $scope;

	vm.dtOptions = DTOptionsBuilder.fromFnPromise(function(){
		var defer = $q.defer();
		//Get list of all roles if they have not already been fetched
		if(appFtry.dataLength('roles') <= 0){
			RolesAndPermissionService.getRoles().then(function(response){
				appFtry.setData('roles', response['data']);
				defer.resolve(appFtry.getAllData('roles'));
			}, function(error){
				utilityService.notify('Cannot load roles now, please contact Kachloan support for assistance - '+error.statusText, 'danger');
			});
		}else {
			defer.resolve(appFtry.getAllData('roles'));
		}
		return defer.promise;
	}).withPaginationType('simple_numbers')
		.withDisplayLength(10)
		.withBootstrap();
    vm.dtColumns = [
        DTColumnBuilder.newColumn('id').withTitle('&nbsp&nbsp&nbsp #').notSortable(),
        DTColumnBuilder.newColumn('name').withClass('roleClass').withTitle('&nbsp&nbsp&nbsp<i class="fa fa-sort-amount-desc"></i>&nbsp&nbspRole'),
        DTColumnBuilder.newColumn('display_name').withTitle('Display Name').notSortable(),
        DTColumnBuilder.newColumn('description').withClass('descClass').withTitle('Description').notSortable(),
        DTColumnBuilder.newColumn('permBtn').withTitle('Permissions').notSortable(),
        DTColumnBuilder.newColumn('manageBtn').withTitle('Manage').notSortable()
    ];

    $(document).on('click', '.permsButton', function(e){
    	e.preventDefault();
    	var id = $(this).attr('rel'), 
        name = $(this).attr('name'),
        stateFactoryDueForCaching = {
            paramId: id,
            paramName: name
        };
        stateFactory.setData('setPermissions', stateFactoryDueForCaching);
    	vm.$apply(function(){
    		$state.go('setPermissions', stateFactoryDueForCaching);	
    	});
    });

    $(document).on('click', '.editRoleButton', function(e){
    	e.preventDefault();
    	var id = $(this).attr('rel'), 
        stateFactoryDueForCaching = {
            editId: id,
            manage: 'edit'
        };
        stateFactory.setData('manageRole', stateFactoryDueForCaching);
    	vm.$apply(function(){
    		$state.go('manageRole', stateFactoryDueForCaching);	
    	});
    });

    $(document).on('click', '.deleteRoleButton', function(e){
    	e.preventDefault();
    	var id = $(this).attr('rel');
    	appFtry.removeDataById('roles', id);
    	$(this).closest('tr').hide('slow');
    	RolesAndPermissionService.deleteRoles(id).then(function(response){
			deleteRoleResponse(response);
			loadBtn.button('reset');
		}, function(error){
			utilityService.notify('Please contact Kachloan Customer Service For Assistance - '+error.statusText, 'danger');
			loadBtn.button('reset');
		});
    });

    function deleteRoleResponse(response){
        reloadTableData();
        if(response.data.success){
            utilityService.notify("Deleted Role - " + vm.payload.name, 'success');
        }else{
            utilityService.notify('Information - '+response.data.errormsg, 'info');
        }
    }

    vm.dtInstance = {};
    vm.dtInstanceCallback = dtInstanceCallback;
    function reloadTableData(){
    	var resetPaging = true;
    	vm.dtInstance.reloadData(function(json){
    		console.log("reloading "+json);
    	}, resetPaging);
    }

    function dtInstanceCallback(dt){
    	console.log("Instance callback");
    	vm.dtInstance = dt;
    }
});