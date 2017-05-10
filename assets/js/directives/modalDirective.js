kacheApp.directive("modal", function () {
	return {
		restrict: "E",
		templateUrl: "view/partials/modalPartial.html",
		scope: {
			title: "@",
			message: "@",
			buttonText: "@",
			classname: "@"
		}
	};
});