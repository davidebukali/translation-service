kacheApp.factory('appFtry', function(Lo){
  var app = function() {
    var data = {
      history: [],
      languages: []
    },
    setDataFunctions = {
      history: setHistory,
      languages: setLanguages
    },
    //env = 'prod';
    env = 'dev';

    function setHistory(historyData){
      return historyData; 
    }

    function setLanguages(languageData){
      return data['languages'] = languageData; 
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