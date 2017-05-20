kacheApp.controller('ViewSponsors', function(
    stateFactory, 
    $scope, 
    utilityService, 
    httpService, 
    appFtry, 
    DTOptionsBuilder, 
    DTColumnBuilder, 
    $q, 
    $state
    ){
	var vm = $scope;

	vm.dtOptions = DTOptionsBuilder.fromFnPromise(function(){
		var defer = $q.defer();
        //var URL = 'http://imagevibez.com/church/getUsersByType.php';
        var URL = 'http://localhost/zion-server/getUsersByType.php';

        httpService.get(URL).then(function(response){
            appFtry.setData('sponsors', response.data.users);

            var sponsorData = appFtry.getAllData('sponsors');

            console.log("Our data is "+JSON.stringify(sponsorData));
            defer.resolve(sponsorData);
        }, function(error){
            utilityService.notify('We are aware of this problem, send us an email if it persists - '+error.statusText, 'danger');
        });
        return defer.promise;
    }).withPaginationType('simple_numbers')
  .withDisplayLength(10)
  .withBootstrap();
  vm.dtColumns = [
  DTColumnBuilder.newColumn('id').withTitle('&nbsp&nbsp&nbsp #').notSortable(),
  DTColumnBuilder.newColumn('pic').withClass('profileImage').withTitle('Profile Avatar').notSortable(),
  DTColumnBuilder.newColumn('uname').withTitle('Username'),
  DTColumnBuilder.newColumn('email').withTitle('Email').notSortable(),
  DTColumnBuilder.newColumn('bio').withTitle('Description').notSortable(),
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

$(document).on('click', '.enableUser', function(e){
    var id = $(this).attr('rel'),
    data = {
        'uid': id,
        'userStatus': 'Y'
    },
    url = 'http://localhost/zion-server/editUser.php';

    httpService.post(url, data).then(function(response){
       /*deleteRoleResponse(response);*/
       toggleBlockBtns(id);
       console.log("res "+JSON.stringify(response));
       loadBtn.button('reset');
   }, function(error){
       utilityService.notify('We are aware of this issue, send us an email if it persists - '+error.statusText, 'danger');
       loadBtn.button('reset');
   });
});

  $(document).on('click', '.disableUser', function(e){
     e.preventDefault();
     var id = $(this).attr('rel'),
     data = {
        'uid': id,
        'userStatus': 'N'
    },
    url = 'http://localhost/zion-server/editUser.php';

    httpService.post(url, data).then(function(response){
       /*deleteRoleResponse(response);*/
       toggleBlockBtns(id);
       console.log("res "+JSON.stringify(response));
       loadBtn.button('reset');
   }, function(error){
       utilityService.notify('We are aware of this issue, send us an email if it persists - '+error.statusText, 'danger');
       loadBtn.button('reset');
   });
});

  function toggleBlockBtns(id){
    $('.disableUserButton-'+id).toggleClass('hide');
    $('.enableUserButton-'+id).toggleClass('hide');
  }

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