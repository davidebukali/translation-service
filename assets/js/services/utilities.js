kacheApp.service('utilityService', function(
	$window, 
	Lo, 
	appFtry
	){
	var window = $window, 
	loadingObject;

	function getUrl(){
		return appFtry.appUrl();
	}

	function capitaliseFirstLetter(string){
		return string.charAt(0).toUppercase() + string.slice(1);
	}

	function lowercaseFirstLetter(string){
		return string.charAt(0).toLowerCase() + string.slice(1);
	}

	function notify(msg, style){
		$.notify({
			message: resolveError(msg)
		},{
			type: style //style: succeess, infor, warning, danger
		});
	}

	/*
	*	Style - success, info, warning, error, dark, notice
	*/
	function stickyNote(titleText, msg, style){
		$(function(){
			new PNotify({
				title: titleText,
				text: msg,
				type: style,
				hide: false,
				styling: 'fontawesome',
				buttons: {
					closer: true
				}
			});
		});
	}

	function validate(elements) {
		var d = $.Deferred();
		$(elements).not("[type=submit]").first().jqBootstrapValidation({
			submitSuccess: function($form, event){
				d.resolve($form, event);
			}
		});
		return d;
	}

	function findByValues(collection, property, values) {
		return Lo(collection).keyBy(property).at(values).value();
	}

	return({
		notify: notify,
		stickyNote: stickyNote,
		validateForm: validate,
		capitaliseFirstLetter: capitaliseFirstLetter,
		lowercaseFirstLetter: lowercaseFirstLetter,
		filterByArray: findByValues,
		getAppUrl: getUrl
	});
});