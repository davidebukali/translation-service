kacheApp.controller('ViewCollateralType', function(
	stateFactory, 
	$scope, 
	utilityService, 
	CollateralService, 
	appFtry, 
	DTOptionsBuilder, 
	DTColumnBuilder, 
	$q, 
	$state){

	var vm = $scope;

	vm.dtOptions = DTOptionsBuilder.fromFnPromise(function(){
		var defer = $q.defer();
		//Get list of all collateral types
		CollateralService.get().then(function(response){
			//console.log("Collateral types "+JSON.stringify(response));
			appFtry.setData('collateralType', response.data);
			defer.resolve(appFtry.getAllData('collateralType'));
		}, function(error){
			utilityService.notify('Cannot load Collateral Types now, we are aware of this problem and working on it - '+error.statusText, 'danger');
		});
		return defer.promise;
	}).withPaginationType('simple_numbers')
		.withDisplayLength(10)
		.withBootstrap();
    vm.dtColumns = [
        DTColumnBuilder.newColumn('id').withTitle('&nbsp&nbsp&nbsp #').notSortable(),
        DTColumnBuilder.newColumn('name').withTitle('&nbsp&nbsp&nbsp<i class="fa fa-sort-amount-desc"></i>&nbsp&nbsp Collateral Name'),
        DTColumnBuilder.newColumn('description').withTitle('&nbsp&nbsp&nbsp Description'),
        DTColumnBuilder.newColumn('manageBtn').withTitle('Manage').notSortable()
    ];

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