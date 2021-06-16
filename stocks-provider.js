class StocksProvider {

    /*
    Get a list of all aviable stocks
    @allStocksCallback - Recevices an array of stocks. Each element must contain is in the form:
    {
        Symbol: Stock symbol (ticker),
        Name: Free text
    }
    */
    getAllStocks(allStocksCallback) {
        throw "Call 'getAllStocks' on abstract DB class";
    }
    
    /*
    Get historic chart data for specific stocks.
    @stocksSymbols - The stocks to fetch
    @stocksDataCallback - Recieve a hash mapping each symbol to it's historic data. The historic data is an array sorted by ascending time. In the form:
    {
        <symbol> : {
            quote: {
                companyName: <name>
            }
            chart: [{
                close: <closing stock value>
                date: <date>
            }]
        }
    }
    */
    loadSelectedStocksData(stocksSymbols, stocksDataCallback) {
        throw "Call 'loadSelectedStocksData' on abstract DB class";
    }
}