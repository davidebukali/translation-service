kacheApp.controller('Dashboard', function($scope, httpService){
	var vm = $scope;
	/*kacheChartService.drawLineChart('lineChart');
	kacheChartService.drawLineChart('lineChartID');
	kacheChartService.drawBarChart();
	kacheChartService.drawPieChart('pieChart');*/
	var url = "http://localhost/zion-server/getDashboard.php";
	httpService.get(url).then(function(res){
		console.log("ok "+JSON.stringify(res));
		vm.active = res.data.active;
		vm.regn = res.data.reg;
	}, function(){
		console.log("off");
	})
});