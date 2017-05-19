kacheApp.directive('fileModel', ['$parse', function ($parse) {
    return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function() {
            try {
                var tmppath = URL.createObjectURL(element[0].files[0]);
                $('#addUserImg').fadeIn("fast").attr('src',tmppath);
            }
            catch(err) {
                console.log('Sponsor error '+err);
            }

            scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
            });
        });
    }
   };
}]);