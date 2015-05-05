<!-- Google Chart Graphing Module - ver 1.0.0 -->
<!-- See https://developers.google.com/chart/ -->
<script src="http://code.jquery.com/jquery-latest.js"></script>
<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha256.js"></script>
<script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/components/enc-base64-min.js"></script>
<script type="text/javascript">
	var password = "1234567890"
	var hash = CryptoJS.SHA1( password ).toString(CryptoJS.enc.Hex);
	console.log( hash );
</script>
<script type="text/javascript">

	// Load the Visualization API and the corechart package (pie, bar, line, & column).
	google.load('visualization', '1.0', {'packages':['corechart']});

	// Set a callback to run when the Google Visualization API is loaded.
	google.setOnLoadCallback(drawChart);

	// Callback that creates and populates a data table,
	// instantiates the pie chart, passes in the data and draws it.
	function drawChart() {

		var tableName = "stats_WorldPopulation";
		var chartType = "Pie"; //set to chart type
		var tableInfo = [];
		var tableHeader = [];
		var tableData = [];

		
		// Acquire data from server
		$.ajax({
			async: false,
		    url: "../api/metadata/" + tableName,
			success: function(data) {
				tableInfo = data.headers;
			}
		});
		
		$.ajax({
			async: false,
		    url: "../api/data/" + tableName,
			success: function(data) {
				tableData = data.rows ;
			}
		});
		
		console.log("metadata...");
		console.log(tableInfo);
		
		console.log("table data...");
		console.log(tableData);
		
		/*
		
		// Strip out table column titles
		for (i=1; i<tableInfo.length; i++ ) {
			tableHeader.push( tableInfo[i][0]);
		}
		
		// Add table header to data
		tableData.unshift( tableHeader );
		
		// Remove table ID column
		for(i=1; i<tableData.length;i++)
			tableData[i].splice(0,1);

		console.log("formatted...");
		console.log( tableData );
		
		// Create the data table.
		var data = new google.visualization.arrayToDataTable( tableData );
		
		// Set chart options
		var options = {
			'title':tableName,
			'width':800,
			'height':600,
			'interpolateNulls':true
		};

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
		
		*/
	}
</script>
