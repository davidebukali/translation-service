kacheApp.directive("cancelButton", function ($window) {
  var linkFunction = function(scope, element, attrs) 
  {
	  element.on('click', function() {
	  	$window.history.back();
	  });
  }

  return {
    restrict: 'E',
    template: '<a class="btn btn-danger">Cancel</a>',
    link: linkFunction
  };
});