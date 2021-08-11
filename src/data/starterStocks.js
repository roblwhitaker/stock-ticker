//const presetColors = ['#fe4a49', '#2ab7ca', '#FFA600', '#fed766', 'red','blue','green','yellow','orange'];
const presetColors = ['#003f5c','#bc5090','#ffa600']
const starterStocks = [
    {
        symbol: 'AAPL',
        name: 'Apple Computer Company',
        color: presetColors[0],
        index: 0,
        overview: {
            Currency: "USD",
            PERatio: "5.11", 
            EPS: "28.61",
            MarketCapitalization: "2410000000000",
            RevenueTTM: "347000000000", 
            GrossProfitTTM:"105000000000"
        }

    },
    {   symbol: 'FB',
        name: 'Facebook',
        color: presetColors[1],
        index: 1,
        overview: {
            Currency: "USD",
            PERatio: "13.47",
            EPS: "26.99",
            MarketCapitalization: "1020000000000",
            RevenueTTM: "105000000000", 
            GrossProfitTTM:"69300000000"
        }
    },
    {
        symbol: 'MSFT',
        name: 'Microsoft Computers',
        color: presetColors[2],
        index: 2,
        overview: {
            Currency: "USD",
            PERatio: "8.05",
            EPS: "35.96",
            MarketCapitalization: "2150000000000",
            RevenueTTM: "168000000000", 
            GrossProfitTTM:"116000000000"
        }
    },
];

export {starterStocks, presetColors}