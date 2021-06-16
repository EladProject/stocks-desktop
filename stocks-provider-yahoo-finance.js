class StocksProviderYahooFinance extends StocksProvider {

    getAllStocks(allStocksCallback) {
        // $.ajax({
        //     url: "https://www.cboe.com/us/equities/market_statistics/listed_symbols/csv/",
        //     type: "GET",
        //     dataType: "text/plain",
        //     crossDomain : true,
        //     success: (data) => {
        //         console.log(data);
        //         allStocksCallback(data.data);
        //     },
        //     error: (err) => {
        //         alert("An error occured creating record for saved tickers: " + err);
        //     }
        // });
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
        
        for (let symbol of stocksSymbols) {
            let url = `https://query1.finance.yahoo.com/v7/finance/chart/${symbol}?interval=1d&range=${timeRange}`;
            $.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                success: (data) => {
                    console.log(data);
                    stocksDataCallback(this.convert(data));
                },
                error: (err) => {
                    alert("An error occured creating record for saved tickers: " + err);
                }
            });
        }
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

        for (const symbol in data) {
            if (typeof data[symbol].values !== 'undefined') {
                converted[symbol] = {
                    quote: data[symbol].meta,
                    chart: this.convertValues(data[symbol].values)
                }
            }
        };

        return converted;
    }

    convertValues(values) {

        var values =  values.map((val) => {
            return {
                close: val.close,
                date: val.datetime
            }
        });

        var sortedValues = values.sort((a,b) => {
            var dateA = new Date(a.date);
            var dateB = new Date(b.date);

            return dateA - dateB;
        });

        return sortedValues;
    }

    static yahooDataCallback(data) {
        console.log|("eee1");
    }
}