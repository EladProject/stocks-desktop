class DB {
    init() {};

    saveSelectedStocks(data) {
        throw "Call 'saveSelectedStocks' on abstract DB class";
    };

    loadSelectedStocks(callback) {
        throw "Call 'loadSelectedStocks' on abstract DB class";
    }
}