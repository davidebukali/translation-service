
// We can write our own fileUpload service to reuse it in the controller
kacheApp.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(uploadUrl, formData){
         return $http.post(uploadUrl, formData, {
             transformRequest: angular.identity,
             headers: {'Content-Type': undefined, 'Process-Data': false}
         });
     }
 }]);