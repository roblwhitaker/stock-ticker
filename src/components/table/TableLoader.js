import React from 'react'
import StockTable from './StockTable'
import { useState, useEffect, useContext } from 'react'
import StocksContext from '../../store/stocks-context';
import { Typography, Box } from '@material-ui/core';

function TableLoader() {
    const stocksCtx = useContext(StocksContext);
    const [tableData, setTableData] = useState([]);

    useEffect(()=>{
        let arrayOfRowArrays=[];
        stocksCtx.stocks.forEach(stock=>{
            const coloredSymbol = (
                <Box style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    backgroundColor: stock.color,
                    opacity: stock.symbol? '1' : '.4',
                    boxSizing: 'border-box',
                    borderRadius: '.5rem',
                    paddingRight: '.4rem',
                    paddingLeft: '.4rem'
                    }}>
                        <Typography 
                        fontWeight="fontWeightBold" 
                        style={{fontSize: '1rem',fontWeight: '500', color: 'white'}} 
                        align='left'>
                            {stock.symbol? stock.symbol: 'No Stock'}
                        </Typography>
                    </Box>  
            )

            let rowArray = [stock.index, coloredSymbol, '-', '-','-', '-','-']
            if(stock.symbol){
                rowArray = [stock.index, coloredSymbol, '-', '-', '-', '-','-'];
            }
            if(stock.symbol && stock.overview){
                rowArray = [
                    stock.index, 
                    coloredSymbol,  
                    stock.overview.PERatio,
                    stock.overview.EPS, 
                    makeSmallNum(stock.overview.MarketCapitalization), 
                    makeSmallNum(stock.overview.RevenueTTM), 
                    makeSmallNum(stock.overview.GrossProfitTTM)
                ];
            }
            arrayOfRowArrays.unshift(rowArray);
        });
        setTableData(arrayOfRowArrays);
    }, [stocksCtx.overviewExists, stocksCtx.stocks]); 

    function makeSmallNum(number) {
        let x = parseFloat(number)
          if(isNaN(x)) return '';
          if(x < 9999) {
              return x;
          }
          if(x < 1000000) {
              return (parseFloat((Math.round((x/10))/100).toPrecision(3)) + "K");
          }
          if(x < 1000000000) {
              return (parseFloat((Math.round((x/10000))/100).toPrecision(3)) + "M");
          }
          if(x < 1000000000000) {
              return (parseFloat((Math.round((x/10000000))/100).toPrecision(3)) + "B");
          }
          if(x < 1000000000000000) {
            return (parseFloat((Math.round((x/10000000000))/100).toPrecision(3)) + "T");
        }
          return "1Q+";
      }
    
    return (
        <StockTable tableData={tableData}/>
    )
}

export default TableLoader
