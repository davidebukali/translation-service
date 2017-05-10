kacheApp.service("databaseService", function() {
  // Return public API.
  return({
    insert: insert,
    readAll: readAll,
    readById: readById,
    update: updateStore,
    deleteRow: deleteRow,
    deleteStore: clearStore
  });


  // ---
  // PRIVATE METHODS.
  // ---

  function prepareDB(callback){
    var dB;
    var name = "zionDB";
    var version = "8";
    var stores = ["users", "posts", "lastID"];

    var request = window.indexedDB.open(name, version);
    request.onsuccess = function(e) {
      dB = e.target.result;
      callback(dB);

    };
    request.onerror = function(event) {
      // Do something with request.errorCode!
      console.log("Error db creation");
    };

    //When version is incremented this runs
    request.onupgradeneeded = function(event) { 
      console.log("Onupgrade DB");
      dB = event.target.result;

      deleteAllStores(dB, stores);

      // Create objectStores for this database
      var userStore = dB.createObjectStore("users", { keyPath: "uid", autoIncrement: true });
      userStore.createIndex('uid', 'uid', { unique: true });

    };

  }

  function deleteAllStores(dB, stores){
    for(store in stores) {
      if(dB.objectStoreNames.contains(stores[store])){
        dB.deleteObjectStore(stores[store]);
      }
    }
  }

  function clearStore(storeName, callback){
    var keypath;
    if(storeName == "users"){
      keypath = 'uid';
    }else{
      keypath = 'id'
    }
    readAll(storeName).then(function(items){
      for(var item = 0; item < items.length; item++){
        deleteRow(storeName, items[item][keypath]);
      }
      callback();
    }).fail(function(){
      callback();
    });
  }
  // ---
  // PUBLIC METHODS.
  // ---
  function insert(storeName, data) {
    var d = $.Deferred();

    prepareDB(function(dB){
      var trans = dB.transaction(storeName, "readwrite");
      var store = trans.objectStore(storeName);
      var request = store.add(data);

      request.onsuccess = function(e) {
        console.log("Succcess data added");
        /*alert("Succcess data added");*/
        d.resolve();
      };

      request.onerror = function(e) {
        console.log("Error data not added");
        /*alert("Error data not added ");*/
        d.reject(e);
      };
    });

    return d;
  }

  function readAll(storeName) {
    var d = $.Deferred();

    prepareDB(function(dB){
      var trans = dB.transaction(storeName, "readonly");
      var store = trans.objectStore(storeName);
      var storeItems = [];
      store.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;

        if(cursor) {
          storeItems.push(cursor.value);
          //console.log('Read '+ cursor.value.uid+" "+cursor.value.email);
          cursor.continue();
        }else {
          //console.log('Entries all read.');
          if(storeItems.length > 0){
            //console.log('Read '+ JSON.stringify(storeItems));
            d.resolve(storeItems);
          }else{
            d.reject(storeItems);
          }

        }
      };

    });

    return d;
  }

  function readById(storeName, indexName, id){
    var d = $.Deferred();

    prepareDB(function(dB){
      var trans = dB.transaction([storeName], "readonly");
      var store = trans.objectStore(storeName);
      var result = null;
      var index = store.index(indexName);
      index.get(id).onsuccess = function(event) {

        result = event.target.result;
      };

      trans.oncomplete = function(event) {
        console.log("Read by id success");
        d.resolve(result);
      };

      trans.error = function(err) {

        console.log("Read by id error");
        d.reject(err);
      };

    });

    return d;
  }

  function updateStore(storeName, updates, callback){
    prepareDB(function(dB){
      readAll(storeName).then(function(storeItems){
        var holder = storeItems[0];
        for(var data in updates){
          holder[data] = updates[data];
        }
        // Put this updated object back into the database.
        var trans = dB.transaction(storeName, "readwrite");
        var store = trans.objectStore(storeName);
        var requestUpdate = store.put(holder);
        requestUpdate.onerror = function(event) {
          // Do something with the error
          console.log("error updating");
          callback("error updating");
        };
        requestUpdate.onsuccess = function(event) {
          // Success - the data is updated!
          console.log("updated");
          callback();

        };

      }).fail(function(){

      });
    });

  }

  function deleteRow(storeName, id){
    var d = $.Deferred();
    prepareDB(function(dB){
      var trans = dB.transaction([storeName], "readwrite");
      var store = trans.objectStore(storeName);
      var request = store['delete'](id);

      request.onsuccess = function(e) {
        console.log("Deleted "+id);
        /*alert("Deleted "+id);*/
        d.resolve();
      };

      request.onerror = function(e) {
        console.log("Not Deleted "+e);
        /*alert("Not Deleted "+e);*/
        d.reject();
      };

    });

    return d;
  }

});
