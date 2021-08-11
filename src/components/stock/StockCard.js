import React from 'react';
import Stock from './Stock';
import Card from '@material-ui/core/Card';
import { CardContent,CardHeader,Typography, Box } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import StocksContext from '../../store/stocks-context';
import {useContext, useState, useEffect} from 'react';
import TrendingUpRoundedIcon from '@material-ui/icons/TrendingUpRounded';
import { makeStyles } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import LoadChart from '../google-charts/LoadChart';


const cardHeight = '369px';
const useStyles = makeStyles((theme)=>{
    return {
        noStockIcon: {
            fontSizeLarge: '500px'
        },
        header: {
            padding: theme.spacing(0),
            width: '100%',
            boxSizing: 'border-box',
        },
        headerText: {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '50px'
          },
        loadChartContainer: {
            padding: theme.spacing(0),
            paddingTop: theme.spacing(1)
        },
        content: {
            padding: theme.spacing(2),
        },
        dividerFullWidth: {
            margin: `0 0 0 0`,
        }
    }})

function StockCard(props) {
    const classes = useStyles();
    const stocksCtx = useContext(StocksContext);
    const [stockExists, setStockExists] = useState(false);

    function deleteStockHandler(){
        stocksCtx.deleteStock(props.stock.index);
        setStockExists(false);
    }

    useEffect(()=>{
        setStockExists(props.stock.symbol? true : false);
    }, [props.stock]);

    const title = (
        <Box style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            backgroundColor: props.stock.color,
            boxSizing: 'border-box',
            borderRadius: '.5rem',
            paddingRight: '.8rem',
            paddingLeft: '.8rem'
            }}>
                <Typography 
                fontWeight="fontWeightBold" 
                style={{fontSize: '2rem',fontWeight: '500', color: 'white'}} 
                align='left'>
                    {props.stock.symbol}
                </Typography>
            </Box>  
    )

    const fullStock = (
        <Card  elevation={3} style={{height: cardHeight, width: '300px'}} align="left">
            <CardContent style={{paddingBottom: '8px'}} className={classes.content} >
                <CardHeader 
                className={classes.header}
                title={title}
                action = {
                    <IconButton onClick={deleteStockHandler}>
                        <CancelIcon/>
                    </IconButton>
                }>
                    <Typography  align="left" variant='h6'>{props.stock.name}</Typography>
                    <Typography align="left">{props.stock.symbol}</Typography>
                </CardHeader>
            </CardContent>
            <CardContent style={{paddingBottom: '0', paddingTop:'0'}}>
                <Stock  stock={props.stock}/>
            </CardContent>
            <CardContent className={classes.loadChartContainer} >
                <LoadChart symbol={props.stock.symbol} color={props.stock.color} /> 
            </CardContent>
        </Card>
    )

    const emptyStock = (
        <Card 
        elevation={0} 
        style={{
        height: cardHeight, 
        width: '300px', 
        backgroundColor: '#e6e6e6', 
        display: 'flex',
        textAlign: 'center',
        flexDirection: 'column',
        justifyContent: 'center'}}>
            <CardContent>
                <TrendingUpRoundedIcon style={{fontSize: '120px', color: props.stock.color, opacity: '.4'}} className='noStockIcon'/>
                <Typography color='textSecondary'>Pick a stock from the search bar to display stock info.</Typography>
            </CardContent>
        </Card>
    )

    return (
        <div>
            {stockExists? fullStock : emptyStock}
        </div>
    )
}

export default StockCard
