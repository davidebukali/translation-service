kacheApp.controller('Dashboard', function($scope, kacheChartService){
	var vm = $scope;
	kacheChartService.drawLineChart('lineChart');
	kacheChartService.drawLineChart('lineChartID');
	kacheChartService.drawBarChart();
	kacheChartService.drawPieChart('pieChart');
});