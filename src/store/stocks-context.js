
import {createContext, useState} from 'react';
import { starterStocks, presetColors } from '../data/starterStocks';
import avKey from '../keys/AV';
import ErrorSnackBar from '../components/ErrorSnackBar';

const StocksContext = createContext({});

export function StocksContextProvider(props){
    const [stocks, setStocks] = useState(starterStocks);
    const [stocksIsFull, setStocksIsFull] = useState(false);
    const [errorMessage, setErrorMessage] = useState(['',1]);
    const [overviewExists, setOverviewExists] = useState([true,true,true]);
    function addStockHandler( name, symbol){
        const stocksArray = [...stocks];
        const colorArray = presetColors.slice();

        if (stocksArray.some(stock=>stock.symbol === symbol)){ //Check if you already have this stock
            setErrorMessage(
                <div key={Math.random()}>
                    <ErrorSnackBar message={`${symbol} is already selected.`}/>
                </div>);
            return;
        }

        let newIndex = stocksArray.findIndex(stock=> stock.symbol === false  || stock.symbol === undefined);
        if (newIndex < 0){
            setErrorMessage(
                <div key={Math.random()}>
                    <ErrorSnackBar message={'Delete a stock to add more.'}/>
                </div>);
            return;
        }

        const preFetchStock = {
            symbol: symbol,
            name: name,
            color: colorArray[newIndex],
            index: newIndex
        }

        stocksArray.splice(newIndex, 1, preFetchStock)
        setStocks(stocksArray);

        fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${avKey}`
            ).then((response)=>{
                return response.json();
            }).then((data)=>{
                const newStock = {
                    symbol: symbol,
                    name: name,
                    color: colorArray[newIndex],
                    index: newIndex,
                    overview: data
                }
                stocksArray.splice(newIndex, 1, newStock)
                setStocks(stocksArray);
                let emptyIndex = stocksArray.findIndex(stock => stock.symbol === false  || stock.symbol === undefined);
                setStocksIsFull(emptyIndex < 0? true : false);
                let overviewExistsArray = overviewExists.splice();
                setOverviewExists(overviewExistsArray.splice(newIndex, 1, true));
            })
}

    function deleteStockHandler(index){
        const stocksArray = stocks.slice();
        const overviewExistsArray = overviewExists.splice();
        const newStock = {
            symbol: false,
            name: false,
            color: presetColors[index],
            index: index,
            overview: false
        }
        stocksArray.splice(index, 1, newStock)
        overviewExistsArray.splice(index,1,false);
        setOverviewExists(overviewExistsArray);
        setStocks(stocksArray);
        setStocksIsFull(false);
    }

    const context = {
        stocks: stocks,
        deleteStock: deleteStockHandler,
        addStock: addStockHandler,
        stocksIsFull: stocksIsFull,
        overviewExists: overviewExists
    };

    return (
    <StocksContext.Provider value ={context}>
        {props.children}
        {errorMessage}
    </StocksContext.Provider>
    )
}

export default StocksContext;