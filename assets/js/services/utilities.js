kacheApp.service('utilityService', function(
	$window, 
	Lo, 
	appFtry, 
	BranchService,
	CollateralService
	){
	var window = $window, loadingObject;

	function capitaliseFirstLetter(string){
		return string.charAt(0).toUppercase() + string.slice(1);
	}

	function lowercaseFirstLetter(string){
		return string.charAt(0).toLowerCase() + string.slice(1);
	}

	function resetFormElement(e) {
		e.wrap('<form>').closest('form').get(0).reset();
		e.unwrap();

	    // Prevent form submission
	    e.stopPropagation();
	    e.preventDefault();
	}

	function organisePermissions(permissions, rolePerms, roleid) {
		var categorisedPermissions = Lo.groupBy(permissions, 'category'),
		permissionsArray = [],
		rolePermissions = Lo.filter(rolePerms, function(item){
			return item.role_id === parseInt(roleid);
		});
		// console.log("allrolepermissions "+JSON.stringify(data.allrolepermissions));
		// console.log("rolePermissions "+JSON.stringify(rolePermissions));

		Lo.map(categorisedPermissions, function(item, index){
			var holder = {};
			Lo.forEach(item, function(itemX, index){
				itemX.active = false;
				//console.log("itemx "+JSON.stringify(itemX));
				Lo.forEach(rolePermissions, function(itemY, indexY){
					//console.log("itemY "+JSON.stringify(itemY));
					if(itemX.id === itemY.permission_id) {
						itemX.active = true;
					}
				});
			});
			holder[index] = item;
			permissionsArray.push(holder);
		});
		return permissionsArray;
	}

	function resolveError(key){
		var serverErrors = {
			"invalid_credentials": "Wrong Username or Password",
			"too_many_attempts": "Account Temporarily Blocked, Please Try Later",
			"token_not_provided": "Token not provided, Please Login", 
			"token_expired": "Token Expired, Please Login Again", 
			"token_absent": "Token Missing, Please Login", 
			"token_invalid": "Token Invalid, Please Login",
			"undefined": "We are aware of this bug, send us an email if it persists"
		}
		return serverErrors[key] ? serverErrors[key] : key;
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

	function pleaseWait(message){
		loadingObject = window.pleaseWait({
			logo: "dist/img/zion.jpg",
			backgroundColor: '#fff',
			loadingHtml: "<p class='loading-message'>"+message+"!</p>"
		});
	}

	function closePleaseWait(){
		if(loadingObject){
			loadingObject.finish();
		}
	}

	function activateDropzone(element, uploadUrl){
		var myDropzone = new Dropzone(element, { 
			url: uploadUrl,
			addRemoveLinks: true,
			maxFileSize: 5,
			maxFiles: 6
		});
	}

	function activateIcheck(){
		// iCheck
		var soupy = $("input.flat");
		if (soupy[0]) {
			soupy.iCheck({
				radioClass: 'iradio_flat-green'
			});
		}
		// iCheck
	}

	function setupSwitchery() {
		$(document).ready(function() {
			if ($(".js-switch")[0]) {
				var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
				elems.forEach(function (html) {
					var switchery = new Switchery(html, {
						color: '#26B99A'
					});
				});
			}
		});
	}

	function activateDatePicker(element){
		$(document).ready(function() {
			$(element).daterangepicker({
				singleDatePicker: true,
				calender_style: "picker_4"
			}, function(start, end, label) {
				console.log(start.toISOString());
			});
		});
	}

	function activateSelect2Tags(dataType, textKey){
		var d = $.Deferred();
		refreshData(dataType).then(function(optionsList){
			d.resolve(organiseSelect2Data(optionsList, textKey));
		});
		return d;
	}

	function organiseSelect2Data(data, textKey){
		var values = [];
		Lo.map(data, function(item){
			values.push({
				id: item['id'],
				name: item[textKey]
			});
		});
		//console.log("data "+JSON.stringify(data));
		//console.log("values "+JSON.stringify(values));

		return values;
	}

	var refreshFactories = {
		branches: refreshBranchFactoryData
	};

	function refreshData(datatype){
		return refreshFactories[datatype]();
	}

	function refreshBranchFactoryData(){
		var d = $.Deferred();
		BranchService.getBranch().then(function(response){
			appFtry.setData('branches', response.data);
			d.resolve(response.data);
		});
		return d;
	}

	function loadCollateralTypeBranchAvailabilityById(id) {
		var d = $.Deferred(),
		payload = {'id':id};
		CollateralService.getBranchList(payload).then(function(response){
			var matchedBranches = Lo.map(response.data, "br_id"),
			allBranches = appFtry.getAllData('branches'),
			list = findByValues(allBranches, 'id', matchedBranches),

			//Rename branch_name to just name for the tags element
			finalList = formatDataForTags(list, 'id', 'branch_name');
			console.log("Branch list "+JSON.stringify(finalList));
			d.resolve(finalList);
		}, function(error){
			console.log("Branch list error "+JSON.stringify(error));
			d.reject(error);
		});
		return d;
	}

	function findByValues(collection, property, values) {
		return Lo(collection).keyBy(property).at(values).value();
	}

	//Tags element requires an object with id and name keys
	function formatDataForTags(list, id_key, name_key){
		var holder, container = [], i;
		for (i = 0; i < list.length; i++) {
			holder = {};
			holder["id"] = list[i][id_key];
			holder["name"] = list[i][name_key];
			container.push(holder);
		}
		return container;
	}

	return({
		notify: notify,
		stickyNote: stickyNote,
		validateForm: validate,
		showLoadingPage: pleaseWait,
		hideLoadingPage: closePleaseWait,
		setIcheck: activateIcheck,
		setupSwitchery: setupSwitchery,
		activateDatePicker: activateDatePicker,
		activateDrop: activateDropzone,
		organisePermissions: organisePermissions,
		capitaliseFirstLetter: capitaliseFirstLetter,
		lowercaseFirstLetter: lowercaseFirstLetter,
		activateTags: activateSelect2Tags,
		refresh: refreshData,
		filterByArray: findByValues,
		loadBranchAvailability: loadCollateralTypeBranchAvailabilityById,
		cleanTagsData: formatDataForTags,
		resetFileInput: resetFormElement
	});
});