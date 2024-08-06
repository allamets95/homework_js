/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 93.87880771736278, "KoPercent": 6.12119228263723};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.18504072260339458, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.20519471825682392, 500, 1500, "HTTP Request - Видалити героя"], "isController": false}, {"data": [0.129658476254589, 500, 1500, "HTTP Request - Отриати всіх героїв"], "isController": false}, {"data": [0.2303538860269414, 500, 1500, "HTTP Request - Отримати героя за id"], "isController": false}, {"data": [0.18075345685616562, 500, 1500, "HTTP Request - Створити героя"], "isController": false}, {"data": [0.18117821415339014, 500, 1500, "HTTP Request - Змінити героя"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 617102, 37774, 6.12119228263723, 2127.9676147540904, 0, 15064, 84.0, 162.0, 185.0, 229.0, 461.1974353589533, 6244.826444700862, 78.6667937684925], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["HTTP Request - Видалити героя", 119506, 0, 0.0, 2052.812871320237, 1, 11369, 632.0, 1861.0, 2234.0, 2992.970000000005, 89.36344269025045, 21.72997776354723, 18.58829423146811], "isController": false}, {"data": ["HTTP Request - Отриати всіх героїв", 127751, 12965, 10.14864854286855, 2476.422305891926, 0, 15064, 698.0, 2075.0, 2481.9000000000015, 3299.980000000003, 95.47600488175642, 6118.4471777007075, 10.64277838394394], "isController": false}, {"data": ["HTTP Request - Отримати героя за id", 125012, 12585, 10.067033564777782, 1805.5998864108897, 0, 11538, 575.0, 1699.0, 2048.0, 2764.9900000000016, 93.43708587987237, 40.90024711503318, 10.421781612758021], "isController": false}, {"data": ["HTTP Request - Створити героя", 123378, 5678, 4.602117071114786, 2150.2330237157535, 1, 12663, 678.5, 1957.0, 2357.0, 3096.920000000013, 92.22627123395189, 31.50542937433425, 19.411096550242004], "isController": false}, {"data": ["HTTP Request - Змінити героя", 121455, 6546, 5.3896504878350004, 2144.589247046198, 1, 10924, 678.0, 1961.9000000000015, 2355.9500000000007, 3156.9900000000016, 90.80510042727853, 32.277741067289824, 19.625365527817962], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["The operation lasted too long: It took 10,475 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, 0.0026473235558850004, 1.6204776519927015E-4], "isController": false}, {"data": ["The operation lasted too long: It took 14,165 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, 0.0026473235558850004, 1.6204776519927015E-4], "isController": false}, {"data": ["The operation lasted too long: It took 10,393 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, 0.0026473235558850004, 1.6204776519927015E-4], "isController": false}, {"data": ["The operation lasted too long: It took 10,609 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, 0.0026473235558850004, 1.6204776519927015E-4], "isController": false}, {"data": ["The operation lasted too long: It took 10,002 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, 0.0026473235558850004, 1.6204776519927015E-4], "isController": false}, {"data": ["The operation lasted too long: It took 12,469 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, 0.0026473235558850004, 1.6204776519927015E-4], "isController": false}, {"data": ["The operation lasted too long: It took 10,245 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, 0.0026473235558850004, 1.6204776519927015E-4], "isController": false}, {"data": ["The operation lasted too long: It took 10,845 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, 0.0026473235558850004, 1.6204776519927015E-4], "isController": false}, {"data": ["The operation lasted too long: It took 10,148 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, 0.0026473235558850004, 1.6204776519927015E-4], "isController": false}, {"data": ["The operation lasted too long: It took 10,447 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, 0.0026473235558850004, 1.6204776519927015E-4], "isController": false}, {"data": ["The operation lasted too long: It took 10,158 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, 0.0026473235558850004, 1.6204776519927015E-4], "isController": false}, {"data": ["The operation lasted too long: It took 11,562 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, 0.0026473235558850004, 1.6204776519927015E-4], "isController": false}, {"data": ["The operation lasted too long: It took 10,425 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, 0.0026473235558850004, 1.6204776519927015E-4], "isController": false}, {"data": ["The operation lasted too long: It took 10,697 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, 0.0026473235558850004, 1.6204776519927015E-4], "isController": false}, {"data": ["The operation lasted too long: It took 10,840 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, 0.0026473235558850004, 1.6204776519927015E-4], "isController": false}, {"data": ["The operation lasted too long: It took 11,902 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, 0.0026473235558850004, 1.6204776519927015E-4], "isController": false}, {"data": ["The operation lasted too long: It took 11,622 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, 0.0026473235558850004, 1.6204776519927015E-4], "isController": false}, {"data": ["The operation lasted too long: It took 15,064 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, 0.0026473235558850004, 1.6204776519927015E-4], "isController": false}, {"data": ["The operation lasted too long: It took 11,002 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, 0.0026473235558850004, 1.6204776519927015E-4], "isController": false}, {"data": ["The operation lasted too long: It took 10,580 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, 0.0026473235558850004, 1.6204776519927015E-4], "isController": false}, {"data": ["The operation lasted too long: It took 10,763 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, 0.0026473235558850004, 1.6204776519927015E-4], "isController": false}, {"data": ["The operation lasted too long: It took 13,645 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, 0.0026473235558850004, 1.6204776519927015E-4], "isController": false}, {"data": ["The operation lasted too long: It took 10,065 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, 0.0026473235558850004, 1.6204776519927015E-4], "isController": false}, {"data": ["The operation lasted too long: It took 11,642 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, 0.0026473235558850004, 1.6204776519927015E-4], "isController": false}, {"data": ["The operation lasted too long: It took 11,449 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, 0.0026473235558850004, 1.6204776519927015E-4], "isController": false}, {"data": ["The operation lasted too long: It took 10,105 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, 0.0026473235558850004, 1.6204776519927015E-4], "isController": false}, {"data": ["The operation lasted too long: It took 11,463 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, 0.0026473235558850004, 1.6204776519927015E-4], "isController": false}, {"data": ["The operation lasted too long: It took 10,360 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, 0.0026473235558850004, 1.6204776519927015E-4], "isController": false}, {"data": ["The operation lasted too long: It took 12,576 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, 0.0026473235558850004, 1.6204776519927015E-4], "isController": false}, {"data": ["The operation lasted too long: It took 10,530 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, 0.0026473235558850004, 1.6204776519927015E-4], "isController": false}, {"data": ["The operation lasted too long: It took 10,465 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, 0.0026473235558850004, 1.6204776519927015E-4], "isController": false}, {"data": ["The operation lasted too long: It took 10,648 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, 0.0026473235558850004, 1.6204776519927015E-4], "isController": false}, {"data": ["The operation lasted too long: It took 13,143 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, 0.0026473235558850004, 1.6204776519927015E-4], "isController": false}, {"data": ["The operation lasted too long: It took 10,562 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, 0.0026473235558850004, 1.6204776519927015E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: localhost:3001 failed to respond", 37739, 99.90734367554403, 6.115520610855255], "isController": false}, {"data": ["The operation lasted too long: It took 10,179 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, 0.0026473235558850004, 1.6204776519927015E-4], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 617102, 37774, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: localhost:3001 failed to respond", 37739, "The operation lasted too long: It took 10,475 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, "The operation lasted too long: It took 14,165 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, "The operation lasted too long: It took 10,393 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, "The operation lasted too long: It took 10,609 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": ["HTTP Request - Отриати всіх героїв", 127751, 12965, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: localhost:3001 failed to respond", 12930, "The operation lasted too long: It took 10,475 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, "The operation lasted too long: It took 14,165 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, "The operation lasted too long: It took 10,393 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1, "The operation lasted too long: It took 10,609 milliseconds, but should not have lasted longer than 10,000 milliseconds.", 1], "isController": false}, {"data": ["HTTP Request - Отримати героя за id", 125012, 12585, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: localhost:3001 failed to respond", 12585, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["HTTP Request - Створити героя", 123378, 5678, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: localhost:3001 failed to respond", 5678, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["HTTP Request - Змінити героя", 121455, 6546, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: localhost:3001 failed to respond", 6546, "", "", "", "", "", "", "", ""], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
