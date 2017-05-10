kacheApp.service('kacheChartService', function($document) {

	var barChart = function barChart(element, labelOne, labelTwo) {
		// Bar chart
      var ctx = angular.element(element);
      var mybarChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ["Jan-1", "Jan-2", "Jan-3", "Jan-4", "Jan-5", "Jan-6", "Jan-7", "Jan-8", "Jan-9", "Jan-10"],
          datasets: [{
            label: labelOne,
            backgroundColor: "#26B99A",
            data: [51, 30, 40, 28, 92, 50, 45, 98, 34, 10]
          }, {
            label: labelTwo,
            backgroundColor: "#03586A",
            data: [41, 56, 25, 48, 72, 34, 12, 22, 18, 23]
          }]
        },

        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
	}

  var lineChart = function lineChart(lineChartID){
    // Line chart
      var ctx = angular.element(lineChartID);
      var lineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ["January", "February", "March", "April", "May", "June", "July"],
          datasets: [{
            label: "My First dataset",
            backgroundColor: "rgba(38, 185, 154, 0.31)",
            borderColor: "rgba(38, 185, 154, 0.7)",
            pointBorderColor: "rgba(38, 185, 154, 0.7)",
            pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointBorderWidth: 1,
            data: [31, 74, 6, 39, 20, 85, 7]
          }]
        },
      });
  }

  var pieChart = function pieChart(pie){
    // Pie chart
      var ctx = angular.element(pie);
      var data = {
        datasets: [{
          data: [120, 50],
          backgroundColor: [
            "#455C73",
            "#9B59B6",
          ],
          label: 'My dataset' // for legend
        }],
        labels: [
          "Green",
          "Blue"
        ]
      };

      var pieChart = new Chart(ctx, {
        data: data,
        type: 'pie',
        otpions: {
          legend: true
        }
      });

  }

	
	return({
		drawBarChart: barChart,
    drawLineChart: lineChart,
    drawPieChart: pieChart
	});
});