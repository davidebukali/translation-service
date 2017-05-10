kacheApp.directive("sideBar", function (adminSidebarService) {
  var linkFunction = function(scope, element, attrs) 
  {
	  adminSidebarService.init();
  }
  return {
    restrict: "E",
    templateUrl: "navigation/sidebar.html",
    link: linkFunction
  };
});