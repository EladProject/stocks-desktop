
var g_selectedStocksSymbols = null;
var g_db = DBFactory.getDB();
var g_stocksProvider = StocksProviderFactory.getStocksProvider();
var g_stockId2Name = {};

async function init() {

	g_db.init();
	g_stocksProvider.getAllStocks(function(allStocks) {
		setStocksList(allStocks).then(()=>{
	    	g_db.loadSelectedStocks(setSelectedStocks);
		});
	});

	$('#all-stocks-list').on('change', function(e) {
		selectedStocks = $('#all-stocks-list').select2('data');
		
		g_selectedStocksSymbols = selectedStocks.map(function(currStock) {
	        return currStock.id;
	    })
		g_db.saveSelectedStocks(g_selectedStocksSymbols);
		loadAndChartSelectedStocks();
	});
}


async function setStocksList(allStocks) {

	return new Promise((resolve, reject) => {

		stocksList = allStocks.filter((stockData) => {return stockData["type"] === "Common Stock"});

		var items = stocksList.map(function (stockData) {
				
			obj = {
				id: stockData["symbol"],
				text: stockData["symbol"] + ":"+ stockData["exchange"] + ":" + stockData["type"] + " : " + stockData["name"]
			};

			// Save id to name mapping
			g_stockId2Name[obj.id] = obj.text;

			return obj;
		});
	

		pageSize = 50;

		jQuery.fn.select2.amd.require(["select2/data/array", "select2/utils"],
			function(ArrayData, Utils) {
				function CustomData($element, options) {
					CustomData.__super__.constructor.call(this, $element, options);
				}
				Utils.Extend(CustomData, ArrayData);

				CustomData.prototype.query = function (params, callback) {

					var results = [];
					if (params.term && params.term !== '') {
					results = items.filter(function(e) {
						return e.text.toUpperCase().indexOf(params.term.toUpperCase()) >= 0;
					});
					} else {
					results = items;
					}

					if (!("page" in params)) {
						params.page = 1;
					}
					var data = {};
					data.results = results.slice((params.page - 1) * pageSize, params.page * pageSize);
					data.pagination = {};
					data.pagination.more = params.page * pageSize < results.length;
					callback(data);
				};

				$('#all-stocks-list').select2({
					data: [],
					dataAdapter: CustomData
				});

				resolve();
			}
		);
	});
}

function timeRangeChanged(evt) {
	loadAndChartSelectedStocks();
}

function setSelectedStocks(selectedStockSymbols) {
	g_selectedStocksSymbols = selectedStockSymbols;
    
	for (const selectedStock of selectedStockSymbols) {
		var option = new Option(g_stockId2Name[selectedStock], selectedStock, true, true);
		$('#all-stocks-list').append(option);
	}
    $('#all-stocks-list').trigger('change');
}

function loadAndChartSelectedStocks() {
	g_stocksProvider.loadSelectedStocksData(g_selectedStocksSymbols, function(stocksData) {
		chartStocks(stocksData);
	});
}