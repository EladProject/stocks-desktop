
var normalizationFunction = percentChange;
var colorArray = ['red', 'orange', 'green', 'cyan', 'magenta', 'brown', 'black', 'gray', 'yello', 'blue'];
var currColor = 0;
var myChart = null;

function chartStocks(stocksData) {
    var ctx = document.getElementById("stocks-chart").getContext('2d');
    currColor = 0;
    if (myChart)
        myChart.destroy();
        
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: buildDataSets(stocksData)
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'time'
                }]
            }
        }
    });    
}

function buildDataSets(stocksData) {
    numSets = Object.keys(stocksData).length;
    dataSets = Array();
    for (var stockData in stocksData) {
        if (stocksData.hasOwnProperty(stockData)) {
            dataSets.push(buildDataForSet(stocksData[stockData]));
        }
    }

    return dataSets;
}

function buildDataForSet(stockData) {
    return {
        label: g_stockId2Name[stockData.quote.symbol], //stockData.quote["companyName"],
        backgroundColor: 'transparent',
        data: normalize(stockData.chart),
        borderColor: getNextColor(),
        lineTension: 0
    };
}

function normalize(stockValues) {
    if (normalizationFunction) {
        return normalizationFunction(stockValues);
    }
    else {
        return stockValues.map(dataPoint => {
            return {x:dataPoint.date, y:dataPoint.close}
        });
    }
}

function percentChange(values) {
    startVal = values[0].close;

    return values.map(dataPoint => {
        return {x:dataPoint.date, y:dataPoint.close/startVal};
    });
}

function getNextColor() {
    if (currColor >= colorArray.length)
        currColor=0;

    return colorArray[currColor++];
}