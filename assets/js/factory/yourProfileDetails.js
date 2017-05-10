kacheApp.factory('profileFactory', function() {
	var profile = function() {
		var data = {},
		pageId = 0,
		remoteuserid;
		return {
			setPageId: function(id){
				console.log('Setting page id '+id);
				pageId = id;
			},
			getPageId: function(){
				return pageId;
			},
			resetData: function(){
				data = {};
			},
			setData: function(payload){
				data = payload;      
			},
			setDataByKey: function(key, value){
				data[key] = value;      
			},
			setId: function(id){
				remoteuserid = id;      
			},
			getId: function(){
				return remoteuserid;      
			},
			getData: function(key){
				return data[key];
			},
			getAll: function(){
				return data;
			},
			getName: function(){
				return 'profilefactory';
			}
		}    

	}();

	return profile;
});