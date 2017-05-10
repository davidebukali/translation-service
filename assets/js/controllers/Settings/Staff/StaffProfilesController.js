kacheApp.controller('StaffProfiles', function(
	stateFactory, 
	$scope, 
	utilityService, 
	StaffService,
	appFtry, 
	$q, 
	$state){

	var vm = $scope;

    //Change this to load appropriate organisation
    StaffService.getStaffByOrganisation(1).then(function(response){
        console.log('response '+JSON.stringify(response.data.success));
        $scope.profiles = response.data.success;
    });

    $(document).on('click', '.editCollateralTypeButton', function(e){
    	e.preventDefault();
    	var id = $(this).attr('rel'), 
        stateFactoryDueForCaching = {
            editId: id,
            manage: 'edit'
        };
        stateFactory.setData('manageCollateralType', stateFactoryDueForCaching);
    	vm.$apply(function(){
    		$state.go('ManageCollateralType', stateFactoryDueForCaching);	
    	});
    });

    $(document).on('click', '.deleteCollateralTypeButton', function(e){
        var loadBtn = angular.element(e.currentTarget);
        loadBtn.button('loading');
        e.preventDefault();
    	var id = $(this).attr('rel');
    	// appFtry.removeDataById('collateralType', id);
    	$(this).closest('tr').hide('slow');
    	CollateralService.delete(id).then(function(response){
			deleteResponse(response);
			loadBtn.button('reset');
		}, function(error){
			utilityService.notify('We are aware of this problem, please send us an email if it persists - '+error.statusText, 'danger');
			loadBtn.button('reset');
		});
    });

    function deleteResponse(response){
        reloadTableData();
        if(response.data.success){
            utilityService.notify("Deleted Collateral Type - " + vm.payload.name, 'success');
        }else{
            utilityService.notify('Information - '+response.data.errormsg, 'info');
        }
    }

});