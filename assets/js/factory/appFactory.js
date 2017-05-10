kacheApp.factory('appFtry', function(Lo) {

  var app = function() {
    var data = {
      roles: [],
      permissions: [],
      rolePermissions: [],
      branches: [],
      collateralType: []
    };

    var setDataFunctions = {
      roles: setRolesData,
      permissions: setPermissionData,
      rolePermissions: setRolePermissionData,
      branches: setBranchesData,
      collateralType: setCollateralType
    };

    function setRolesData(roles){
      var role_id;
      for(role in roles){
        role_id = roles[role].id;
        role_name = roles[role].name;
        roles[role].permBtn = "<a class='btn btn-primary btn-xs permsButton' rel='"+role_id+"' name='"+role_name+"'>Permissions</a>";
        roles[role].manageBtn = "<div class='row'><a class='btn btn-default btn-xs editRoleButton' rel='"+role_id+"'>Edit</a><a class='btn btn-danger btn-xs deleteRoleButton' rel='"+role_id+"'>Delete</a></div>";
      }
      return roles;
    }

    function setPermissionData(info){
      return info;
    }

    function setRolePermissionData(info){
      return info;
    }

    function setBranchesData(branches){
      var branch_id;
      for(branch in branches){
        branch_id = branches[branch].id;
        branches[branch].manageBtn = "<div class='row'>"+
        "<a class='btn btn-default btn-xs editBranchButton' rel='"+branch_id+"'>Edit"+
        "</a><a data-loading-text='<i class=fa fa-btn fa-spinner fa-spin></i> Please wait' class='btn btn-danger btn-xs deleteBranchButton' rel='"+branch_id+"'>Delete</a>"+
        "</div>";
      }
      return branches;
    }

    function setCollateralType(collateral_types){
      var type_id;
      for(type in collateral_types){
        type_id = collateral_types[type].id;
        collateral_types[type].manageBtn = "<div class='row'>"+
        "<a class='btn btn-default btn-xs editCollateralTypeButton' rel='"+type_id+"'>Edit"+
        "</a><a data-loading-text='<i class=fa fa-btn fa-spinner fa-spin></i> Please wait' class='btn btn-danger btn-xs deleteCollateralTypeButton' rel='"+type_id+"'>Delete</a>"+
        "</div>";
      }
      return collateral_types;
    }

    return {
      resetData: function(datatype){
        data[datatype] = [];
      },
      setData: function(datatype, info){
        data[datatype] = setDataFunctions[datatype](info);
      },
      getDataByIndex: function(datatype, index){
        return data[datatype][index];
      },
      getDataById: function(datatype, Id){
        return Lo.find(data[datatype], { id: parseInt(Id) });
      },
      removeDataById: function(datatype, id){
        for(item in data[datatype]){
          if(data[datatype][item].id == parseInt(id)){
            return data[datatype].splice(item, 1);
          }
        }
      },
      getAllData: function(datatype){
        return data[datatype];
      },
      dataLength: function(datatype){
        return data[datatype].length;
      }
    }    

  }();

  return app;
});