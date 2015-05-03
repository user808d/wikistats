<!-- Google Chart Graphing Module - ver 1.0.0 -->
<!-- See https://developers.google.com/chart/ -->
<script src="http://code.jquery.com/jquery-latest.js"></script>
<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<script type="text/javascript">

	// Load the Visualization API and the corechart package (pie, bar, line, & column).
	google.load('visualization', '1.0', {'packages':['corechart']});

	// Set a callback to run when the Google Visualization API is loaded.
	google.setOnLoadCallback(drawChart);

	// Callback that creates and populates a data table,
	// instantiates the pie chart, passes in the data and draws it.
	function drawChart() {


		// Acquire data from server
		var tableName = "merp";
		var tableInfo = null;
		var tableData = null;
		
		$.ajax({
			url: "api/metadata/" + tableName;
			success: function(data) {
				tableInfo( data.headers );
			}
		});
		
		$.ajax({
			url: "api/data/" + tableName;
			success: function(data) {
				tableData( data.rows );
			}
		});

		console.log( tableInfo );
		console.log( tableData );

		// Create the data table.
		var title = "fake "; //set to stat title
		var chartType = "Pie";
		var data = new google.visualization.DataTable();
		
		// Set chart options
		var options = {'title':title, 'width':400, 'height':300};
		
		// Populate table data in some fashion
		data.addRows( tableData );

		// Acquire wrapping div by ID
		var divWrapper = document.getElementById('chart_div');
		
		// Instantiate chart based on type
		var chart = null;
		
		if (chartType == "Pie")
			chart = new google.visualization.PieChart(divWrapper);
		
		else if (chartType == "Line") {
			chart = new google.visualization.LineChart(divWrapper);
		}
		
		else if (chartType == "Bar" ) {
			chart = new google.visualization.BarChart(divWrapper);
		}
		
		else if (chartType == "Column") {
			chart = new google.visualization.ColumnChart(divWrapper);
		}
		
		// Draw chart, passing in configuration options
		if (chart) chart.draw(data, options);
	}
</script>
