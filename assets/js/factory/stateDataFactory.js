kacheApp.factory('stateFactory', function(Lo, utilityService) {

  var state = function() {
    var data = {
      manageUser: []
    };

    return {
      setData: function(stateName, info){
        data[stateName] = [];
        data[stateName] = info;
      },
      getDataByIndex: function(stateName, index){
        return data[stateName][index];
      },
      getDataById: function(stateName, Id){
        return Lo.find(data[stateName], { id: parseInt(Id) });
      },
      removeDataById: function(stateName, id){
        for(item in data[stateName]){
          if(data[stateName][item].id == id){
            return data[stateName].splice(item, 1);
          }
        }
      },
      getAllData: function(stateName){
        return data[stateName];
      },
      dataLength: function(stateName){
        return data[stateName].length;
      }
    }    

  }();

  return state;
});