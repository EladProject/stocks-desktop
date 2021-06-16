const fs = require('fs');
const selectedStocksFile = "selected_stocks.json";

class DBFile extends DB {

    async init() {
        try {
            if (fs.existsSync(selectedStocksFile)) {
                console.log(`Found ${selectedStocksFile}`);
            }
            else {
                console.log(`${selectedStocksFile} not found. Creating`);
                fs.writeFileSync(selectedStocksFile, JSON.stringify([]));
            }
        } catch(err) {
            console.error(err)
        }
    };

    saveSelectedStocks(data) {
        fs.writeFileSync(selectedStocksFile, JSON.stringify(data));
    };

    loadSelectedStocks(callback) {
        const data = fs.readFileSync(selectedStocksFile);
        callback(JSON.parse(data));
    }
}