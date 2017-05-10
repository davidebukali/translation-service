kacheApp.controller('ViewSponsors', function(stateFactory, $scope, utilityService, RolesAndPermissionService, appFtry, DTOptionsBuilder, DTColumnBuilder, $q, $state) {
	var vm = $scope;

	vm.dtOptions = DTOptionsBuilder.fromFnPromise(function(){
		var defer = $q.defer();
		//Get list of all roles if they have not already been fetched
		defer.resolve([{"id":1,"name":"Artist","display_name":"consequatur","description":"Unde ut magnam et quidem ratione et temporibus."},{"id":2,"name":"Automatic Teller Machine Servicer","display_name":"est","description":"Dicta a et autem sed magni vel est odio."},{"id":3,"name":"Eligibility Interviewer","display_name":"quod","description":"Architecto fugiat dolor non rerum ratione modi in."},{"id":4,"name":"Mold Maker","display_name":"unde","description":"In nesciunt occaecati aut aut perferendis eos."},{"id":5,"name":"Telephone Station Installer and Repairer","display_name":"et","description":"Sint et omnis cum eaque."},{"id":6,"name":"Drywall Ceiling Tile Installer","display_name":"iusto","description":"Animi et tenetur ut reiciendis cupiditate."},{"id":7,"name":"Central Office Operator","display_name":"iste","description":"Dolores sit quis provident dicta magni."},{"id":8,"name":"Paperhanger","display_name":"et","description":"Ad rem voluptatem rem ut earum beatae et."},{"id":9,"name":"Agricultural Sciences Teacher","display_name":"dolore","description":"Laborum sed in nihil illum vel aliquam maiores maiores."},{"id":10,"name":"Brazer","display_name":"vero","description":"Quia earum dicta quam magnam sequi saepe ut ipsa."},{"id":11,"name":"Gaming Dealer","display_name":"dolor","description":"Aut cum ut dolorem recusandae ipsa non."},{"id":12,"name":"Hand Presser","display_name":"corrupti","description":"Est enim cupiditate at consequatur ut sit magnam ullam."},{"id":13,"name":"Gas Processing Plant Operator","display_name":"suscipit","description":"Ea consequuntur nostrum eum velit quis neque."},{"id":14,"name":"Anthropologist","display_name":"est","description":"Recusandae in illo ut."},{"id":15,"name":"Court Reporter","display_name":"et","description":"Itaque perferendis sint ut ab praesentium et vel."},{"id":16,"name":"Commercial Diver","display_name":"voluptatem","description":"Aut beatae nemo facilis soluta qui et."},{"id":17,"name":"Gas Plant Operator","display_name":"quasi","description":"Quibusdam perferendis velit delectus assumenda cumque."},{"id":18,"name":"Hand Trimmer","display_name":"labore","description":"Repudiandae quia et voluptas."},{"id":19,"name":"Electrical Power-Line Installer","display_name":"aspernatur","description":"Ex suscipit at harum nemo sit."},{"id":20,"name":"Civil Engineer","display_name":"voluptatem","description":"Placeat exercitationem provident alias."},{"id":21,"name":"Stone Cutter","display_name":"autem","description":"Quae distinctio et ullam totam distinctio a."},{"id":22,"name":"Psychiatric Aide","display_name":"voluptatem","description":"In voluptates ea voluptate impedit dignissimos aut."},{"id":23,"name":"Stonemason","display_name":"corrupti","description":"Reprehenderit sapiente provident eum aut."},{"id":24,"name":"Preschool Education Administrators","display_name":"et","description":"Dolores alias quos recusandae nobis dicta quod laudantium voluptas."},{"id":25,"name":"Semiconductor Processor","display_name":"libero","description":"Repellendus odit atque consequatur ipsa."}]);
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