kacheApp.factory('appFtry', function(Lo){

  var app = function() {
    var data = {
      roles: [],
      permissions: [],
      rolePermissions: [],
      branches: [],
      collateralType: [],
      posts: [],
      sponsors: []
    },
    setDataFunctions = {
      roles: setRolesData,
      permissions: setPermissionData,
      rolePermissions: setRolePermissionData,
      branches: setBranchesData,
      collateralType: setCollateralType,
      posts: setPosts,
      sponsors: setSponsorsData
    },
    env = 'dev';

    function setSponsorsData(sponsors){
      var sponsorDataContainer = [];
      for(sponsor in sponsors){
        var sponsorData = {};
        var picUrl = getAvatarUrl(sponsors[sponsor]),
        toggleEnableClass = sponsors[sponsor].userStatus == 'Y' ? 'hide' : '',
        toggleDisableClass = sponsors[sponsor].userStatus == 'N' ? 'hide' : '';
        sponsorData['id'] = parseInt(sponsors[sponsor].uid);
        sponsorData['uname'] = sponsors[sponsor].uname;
        sponsorData['email'] = sponsors[sponsor].email;
        sponsorData['bio'] = sponsors[sponsor].bio;
        sponsorData['pwd'] = sponsors[sponsor].pwd;
        sponsorData['usertype'] = sponsors[sponsor].usertype;
        sponsorData['userStatus'] = sponsors[sponsor].userStatus;
        sponsorData['picUrl'] = picUrl;
        sponsorData['viewposts'] = "<a class='btn btn-primary btn-xs viewUserPostsButton' rel='"+sponsors[sponsor].uid+"'>View Posts</a>";
        sponsorData['pic'] = '<img src="'+picUrl+'" alt="..." class="img-circle profile_img" style=" width: 60px;">';
        sponsorData['manageBtn'] = "<div class='row'><a class='btn btn-default btn-xs editUserButton' rel='"+sponsors[sponsor].uid+"'>Edit</a><a class='btn btn-danger btn-xs disableUser disableUserButton-"+sponsors[sponsor].uid+" "+toggleDisableClass+"' rel='"+sponsors[sponsor].uid+"'><i class='fa fa-lock'></i>&nbsp Block</a><a class='btn btn-success btn-xs enableUser enableUserButton-"+sponsors[sponsor].uid+" "+toggleEnableClass+"' rel='"+sponsors[sponsor].uid+"'><i class='fa fa-unlock'></i>&nbsp Unblock</a></div>";
        sponsorDataContainer.push(sponsorData);
      }
      console.log("Our data is "+JSON.stringify(sponsorDataContainer));
      return sponsorDataContainer;
    }

    function getAvatarUrl(userData){
      var profileImage = userData['profilePic'].length;
      if(profileImage == 0){
        userData['profileimage'] = 'dist/img/user-icon.png';
      }else{
        var pic = userData['profilePic'].split('.'),
        url = selectUrl();
        userData['profileimage'] = url+'churchimages/'+pic[0]+"_resize.jpg";
      }
      return userData['profileimage'];
    }

    function setPosts(postData){
      var data = Lo.forEach(postData, function(item){            
        var date = new Date(item.time),
        time = date.toLocaleTimeString(),
        datestring = date.toDateString();
        item.imagePaths = selectUrl()+"churchimages/"+item.imagePaths;
        item.time = datestring+', '+time;
        return item;
      });
      return Lo.chunk(data, 5);
    }

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

    function selectUrl() {
      var url = "";
      if(env.indexOf('dev') != -1){
        url = "http://localhost/zion-server/";
      }else {
        url = "http://imagevibez.com/church/";
      }
      return url;
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
      },
      appUrl: function(){
        return selectUrl();
      }
    }    

  }();

  return app;
});