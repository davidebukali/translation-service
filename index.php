<!DOCTYPE html>
<html xmlns:ng="http://angularjs.org" lang="en" ng-app="kache" ui-router-styles>
<head>
	<base href="/zion-admin/"></base>

	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta content="IE=EmulateIE8" http-equiv="X-UA-Compatible" /> 

	<title>Zion</title>

	<!--[if lt IE 9]>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/es5-shim/2.2.0/es5-shim.js"></script>
    <script>
      document.createElement('ui-select');
      document.createElement('ui-select-match');
      document.createElement('ui-select-choices');
    </script>
  	<![endif]-->

	<link href="dist/css/app.css" rel="stylesheet">

</head>

<body id="home" class="index nav-md">

	<div id="app-wrapper" ui-view></div>

	<script src="dist/js/vendor.js"></script>
	<script src="dist/js/app.js"></script>

</body>
</html>
