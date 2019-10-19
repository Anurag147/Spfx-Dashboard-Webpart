google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawVisualization);

google.charts.setOnLoadCallback(drawSpendChart);
        google.charts.setOnLoadCallback(drawComplianceChart);
        google.charts.setOnLoadCallback(drawSLAChart);
        google.charts.setOnLoadCallback(drawCreditChart);

        function drawSpendChart() {
            var data = google.visualization.arrayToDataTable([
                ['Supplier', '2017', '2018', '2019'],
                ['Supplier 1', 1000, 850, 600],
                ['Supplier 2', 1300, 880, 800],
                ['Supplier 3', 1250, 920, 1000],
                ['Supplier 4', 1150, 1000, 1100]
            ]);

            var options = {
                title: '',
                curveType: 'function',
                hAxis: { textPosition: 'none' },
                vAxis: { textPosition: 'none', viewWindow: { min: 600, max: 1400 }, gridlines: { count: 2 } },
                legend: { position: 'bottom' },
                colors: ['#ff4136', '#ff6d00', '#3d108a'],
                titleTextStyle: { fontName: 'EYInterstate Light', fontSize: 13 }
            };

            var chart = new google.visualization.LineChart(document.getElementById('spend_chart'));

            chart.draw(data, options);
        }
        function drawComplianceChart() {
            var data = google.visualization.arrayToDataTable([
                ['Supplier', '2017', '2018', '2019'],
                ['Supplier 1', 1000, 800, 600],
                ['Supplier 2', 1250, 760, 800],
                ['Supplier 3', 1300, 690, 1000],
                ['Supplier 4', 1030, 670, 1300]
            ]);

            var options = {
                title: '',
                curveType: 'function',
                hAxis: { textPosition: 'none' },
                vAxis: { textPosition: 'none', viewWindow: { min: 600, max: 1400 }, gridlines: { count: 2 } },
                legend: { position: 'bottom' },
                colors: ['#ff4136', '#ff6d00', '#3d108a'],
                titleTextStyle: { fontName: 'EYInterstate Light', fontSize: 13 }
            };

            var chart = new google.visualization.LineChart(document.getElementById('compliance_chart'));

            chart.draw(data, options);
        }
        function drawSLAChart() {
            var data = google.visualization.arrayToDataTable([
                ['Supplier', '2017', '2018', '2019'],
                ['Supplier 1', 1000, 970, 600],
                ['Supplier 2', 1170, 920, 800],
                ['Supplier 3', 1070, 880, 1000],
                ['Supplier 4', 970, 820, 1300]
            ]);

            var options = {
                title: '',
                curveType: 'function',
                hAxis: { textPosition: 'none' },
                vAxis: { textPosition: 'none', viewWindow: { min: 600, max: 1400 }, gridlines: { count: 2 } },
                legend: { position: 'bottom' },
                colors: ['#ff4136', '#ff6d00', '#3d108a'],
                titleTextStyle: { fontName: 'EYInterstate Light', fontSize: 13 }
            };

            var chart = new google.visualization.LineChart(document.getElementById('SLA_chart'));

            chart.draw(data, options);
        }
        function drawCreditChart() {
            var data = google.visualization.arrayToDataTable([
                ['Supplier', '2017', '2018', '2019'],
                ['Supplier 1', 1250, 940, 600],
                ['Supplier 2', 1150, 820, 800],
                ['Supplier 3', 1200, 900, 1000],
                ['Supplier 4', 1050, 960, 1300]
            ]);

            var options = {
                title: '',
                curveType: 'function',
                hAxis: { textPosition: 'none' },
                vAxis: { textPosition: 'none', viewWindow: { min: 500, max: 1400 }, gridlines: { count: 2 } },
                legend: { position: 'bottom' },
                colors: ['#ff4136', '#ff6d00', '#3d108a'],
                titleTextStyle: { fontName: 'EYInterstate Light', fontSize: 13 }
            };

            var chart = new google.visualization.LineChart(document.getElementById('credit_chart'));

            chart.draw(data, options);
        }

function drawVisualization() { 

    var data = google.visualization.arrayToDataTable([
      ['','',{ role: 'style' }],
      ['Critical', 2,'color: red'],
      ['High', 5,'color: orange'],
      ['Medium',12,'color: yellow'],
      ['Low',4,'color: green']
    ]);

    var options = {
        title : '',
        vAxis: {title: '', titleTextStyle: {fontName:'EYInterstate Light', fontSize:13}},
        hAxis: {title: '', titleTextStyle: {fontName:'EYInterstate Light', fontSize:13}},
        seriesType: 'bars',
        series: {5: {type: 'line'}},
        titleTextStyle: {fontName:'EYInterstate Light', fontSize:16},
        legend: 'none',
      };

      var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
      chart.draw(data, options);
  }