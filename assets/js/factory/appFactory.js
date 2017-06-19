kacheApp.factory('appFtry', function(Lo){
  var app = function() {
    var data = {
      languages: []
    },
    setDataFunctions = {
      languages: setLanguages
    };

    function setLanguages(languageData){
      return data['languages'] = languageData; 
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