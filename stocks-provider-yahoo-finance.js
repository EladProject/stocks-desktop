class StocksProviderYahooFinance extends StocksProvider {

    getAllStocks(allStocksCallback) {
        
        $.ajax({
            url: "https://api.twelvedata.com/stocks",
            type: "GET",
            dataType: "json",
            success: (data) => {
                console.log(data);
                allStocksCallback(data.data);
            },
            error: (err) => {
                alert("An error occured creating record for saved tickers: " + err);
            }
        });
    }


    loadSelectedStocksData(stocksSymbols, stocksDataCallback) {
        var timeRange = this.convertTimeRange($('#time-range-select').val());
        var stocksData = {};
        for (let symbol of stocksSymbols) {
            let url = `https://query1.finance.yahoo.com/v7/finance/chart/${symbol}?interval=1d&range=${timeRange}`;
            var data = $.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                async: false,
                error: (err) => {
                    alert("An error occured creating record for saved tickers: " + err);
                }
            });

            stocksData[symbol] = this.convert(data.responseJSON.chart.result[0]);
        }

        stocksDataCallback(stocksData);
    }


    convertTimeRange(timeRange) {
        switch (timeRange) {
            case "1m":
                return "1mo";
                break;
            case "2m":
                return "2mo";
                break;
            case "6m":
                return "6mo";
                break;
            case "1y":
            case "2y":
            case "5y": 
                return timeRange;
                break;
            case "10y":
                return timeRange;
                break;
            default:
                return "1y";
                break;
        }
    }

    convert(data) {
        var converted = {};

        converted.quote = data.meta;
        converted.chart = [];
        for (var i=0; i<data.timestamp.length; ++i) {
            
            converted.chart.push({
                close: data.indicators.quote[0].close[i],
                date: data.timestamp[i]
            });
            
        };

        converted.chart = converted.chart.sort((a,b) => {
            var dateA = new Date(a.date);
            var dateB = new Date(b.date);

            return dateA - dateB;
        });

        return converted;
    }

    static yahooDataCallback(data) {
        console.log|("eee1");
    }
}