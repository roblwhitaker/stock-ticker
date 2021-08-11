import React from 'react'
import { useState, useEffect} from 'react';
import avKey from '../../keys/AV'

import { CircularProgress } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Box, Icon } from '@material-ui/core';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';

function Stock(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [fetchFailed, setFetchFailed] = useState(false);
    const [stockGQ, setStockGQ] = useState({});
    const correctArrow = parseFloat(stockGQ['09. change']) < 0? ArrowDownwardRoundedIcon : ArrowUpwardRoundedIcon;

    function convertPrice(price){
        return parseFloat(price).toFixed(2);
    }

    useEffect(()=>{
        if (!props.stock.symbol){
            setStockGQ({});
            return;
        }
        setIsLoading(true);
        
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${props.stock.symbol}&apikey=${avKey}`
            ).then((response)=>{
                return response.json();
            }).then((data)=>{
                setIsLoading(false);
                setStockGQ(data['Global Quote']);
                setFetchFailed(false);
            }).catch(error => {
                setIsLoading(false);
                setFetchFailed(true);
            });
    }, [props.stock.symbol]);

    const loadingContent = (
        <CircularProgress style={{color: props.stock.color}}/>
    )

    const failedFetchContent = (
        <Typography  align='left' variant="subtitle">No Price Data</Typography>
    )

    const priceContent = (
        <Box style={{display:'inline-flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap'}}>
            <Typography  
            align='left' 
            variant="h4">
                {`$${convertPrice(stockGQ['05. price'])}\u00A0`}
            </Typography>
            <Box style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            backgroundColor: '#E0E0E0',
            boxSizing: 'border-box',
            borderRadius: '.5rem',
            height: '2rem',
            paddingRight: '.4rem',
            paddingLeft: '.3rem'
            }}>
                <Icon component={correctArrow}  style={{fontSize: '1rem',fontWeight: '600', color: 'black'}}/>
                <Typography 
                fontWeight="fontWeightBold" 
                style={{fontSize: '1rem',fontWeight: '500', color: 'black'}}
                align='left'>
                    {Math.abs(convertPrice(stockGQ['10. change percent']))}%
                </Typography>
            </Box>  
        </Box>
    )

    let content = loadingContent;
    if(fetchFailed){
        content = failedFetchContent;
    } else if (!isLoading){
        content = priceContent;
    }

    return (
        <Box style={{alignItems: 'left', height: '41.33px'}}>
            {content}
        </Box>
    )
}

export default Stock
