kacheApp.directive("settingsView", function () {
	return {
		restrict: "E",
		templateUrl: "view/partials/settings/settingTemplate.html",
		scope: {
			pageTitle: "@title",
			addButtonTitle: "@buttonTitle",
			addButtonUrl: "@buttonUrl",
			tableHeaders: "=headers",
			tableRows: "=rows",
			repeatEvent: "@repeat"
		}
	};
});