import React from 'react'
import StocksContext from '../../store/stocks-context';
import {useContext} from 'react';
import ListItem from '@material-ui/core/ListItem';
import { ListItemText, ListItemIcon, IconButton, Typography } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

function SearchItem(props) {
    const stocksCtx = useContext(StocksContext);
    
    function addStockHandler(event){
        event.preventDefault();
        stocksCtx.addStock( props.name, props.symbol);
    }

    let text = (
        <div  style={{display: 'inline'}}>
            <Typography  
                style={{display: 'block', fontWeight: '500'}} 
                variant="body1" 
                color="textPrimary">
                {props.symbol}
            </Typography>
            <Typography 
                noWrap   
                style={{display: 'inline-block'}}
                variant="subtitle" color="textSecondary">
                {props.name.substring(0,26)}
            </Typography>
       </div>
    )

    let icon = (
        <ListItemIcon>
            <IconButton onClick={addStockHandler}>
                <AddCircleIcon color='primary'/>
            </IconButton>
        </ListItemIcon>
    )
    return (
        <ListItem   
            onClick={addStockHandler}
            button
            divider>
            <ListItemText style={{display: 'inline'}} primary={text}/>
        </ListItem>
    )
}

export default SearchItem
