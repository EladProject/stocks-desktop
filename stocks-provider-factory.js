class StocksProviderFactory {
    static getStocksProvider() {
        //return new StocksProviderIEx();
        //return new StocksProviderTwelveData();
        return new StocksProviderYahooFinance();
    }
}