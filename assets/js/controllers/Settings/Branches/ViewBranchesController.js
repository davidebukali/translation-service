kacheApp.controller('ViewBranches', function(
	stateFactory, 
	$scope, 
	utilityService, 
	BranchService, 
	appFtry, 
	DTOptionsBuilder, 
	DTColumnBuilder, 
	$q, 
	$state){

	var vm = $scope;

	vm.dtOptions = DTOptionsBuilder.fromFnPromise(function(){
		var defer = $q.defer();
		//Get list of all branches
		BranchService.getBranch().then(function(response){
			appFtry.setData('branches', response.data);
			defer.resolve(appFtry.getAllData('branches'));
		}, function(error){
			utilityService.notify('Cannot load branches now, we are aware of this problem and working on it - '+error.statusText, 'danger');
		});
		return defer.promise;
	}).withPaginationType('simple_numbers')
		.withDisplayLength(10)
		.withBootstrap();
    vm.dtColumns = [
        DTColumnBuilder.newColumn('id').withTitle('&nbsp&nbsp&nbsp #').notSortable(),
        DTColumnBuilder.newColumn('branch_name').withTitle('&nbsp&nbsp&nbsp<i class="fa fa-sort-amount-desc"></i>&nbsp&nbsp Branch Name'),
        DTColumnBuilder.newColumn('branch_manager').withTitle('&nbsp&nbsp&nbsp Manager'),
        DTColumnBuilder.newColumn('manageBtn').withTitle('Manage').notSortable()
    ];

    $(document).on('click', '.editBranchButton', function(e){
    	e.preventDefault();
    	var id = $(this).attr('rel'), 
        stateFactoryDueForCaching = {
            editId: id,
            manage: 'edit'
        };
        stateFactory.setData('manageBranch', stateFactoryDueForCaching);
    	vm.$apply(function(){
    		$state.go('manageBranches', stateFactoryDueForCaching);	
    	});
    });

    $(document).on('click', '.deleteCollateralTypeButton', function(e){
        var loadBtn = angular.element(e.currentTarget);
        loadBtn.button('loading');
        e.preventDefault();
    	var id = $(this).attr('rel');
    	$(this).closest('tr').hide('slow');
    	BranchService.delete(id).then(function(response){
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