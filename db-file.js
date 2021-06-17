const fs = require('fs');
const selectedStocksFile = "selected_stocks.json";

class DBFile extends DB {

    init() {
        try {
            if (fs.existsSync(selectedStocksFile)) {
                console.log(`Found ${selectedStocksFile}`);
            }
            else {
                console.log(`${selectedStocksFile} not found. Creating`);
                fs.writeFileSync(selectedStocksFile, JSON.stringify({savedStocks: {set1: []}}));
            }
        } catch(err) {
            console.error(err)
        }
    };

    saveSelectedStocks(data) {
        var fileData = {
            savedStocks: {
                set1: data
            }
        }
        fs.writeFileSync(selectedStocksFile, JSON.stringify(fileData));
    };

    loadSelectedStocks(callback) {
        const fileData = fs.readFileSync(selectedStocksFile);
        const data = JSON.parse(fileData);
        callback(data.savedStocks.set1);
    }
}