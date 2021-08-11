
import React from 'react'
import { useContext } from 'react';
import StockCard from '../components/stock/StockCard';
import StocksContext from '../store/stocks-context';
import Grid from '@material-ui/core/Grid';

function StockView() {
    const stocksCtx = useContext(StocksContext);
    
    return (
        <Grid container spacing={2}  alignContent="space-between" justifyContent="space-between">
            <Grid item xs={12} sm={12} md={6} lg={4} align="center">
                <StockCard stock={stocksCtx.stocks[0]}/>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} align="center">
                <StockCard stock={stocksCtx.stocks[1]}/>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} align="center">
                <StockCard stock={stocksCtx.stocks[2]}/>
            </Grid>
        </Grid>
    )
}

export default StockView
