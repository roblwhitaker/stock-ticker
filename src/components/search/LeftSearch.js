import { TextField, InputAdornment, Paper} from '@material-ui/core'
import React from 'react'
import classes from './LeftSearch.module.css'
import SearchIcon from '@material-ui/icons/Search';
import { useState, useRef} from 'react';
import avKey from '../../keys/AV'
import SearchList from './SearchList';
import { ClickAwayListener } from '@material-ui/core';


function LeftSearch() {
    const inputRef = useRef();
    const [paperClass,setPaperClass] = useState(classes.paperInactive);
    const [listIsVisible, setListIsVisible] = useState(false);
    const [input, setInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    let noResult = [{
        "1. symbol": "No results",
        "2. name": "",
    }]
    
    function blurHandler (event) {
        setPaperClass(classes.paperInactive)
        setListIsVisible(false)
    }

    function clickHandler () {
        if(input.length>0){
        setPaperClass(classes.paperActive)
        setListIsVisible(true)
        }
    }

    function clearInput(){
        setInput('');
        setPaperClass(classes.paperInactive);
        setListIsVisible(false);
    }

    function searchHandler(event){
        const searchTerm = event.target.value;
        setInput(searchTerm);
        setPaperClass(classes.paperActive)
        setListIsVisible(true)
        if(searchTerm.length <1){
            setListIsVisible(false)
            setPaperClass(classes.paperInactive)
            return;
        }
    
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchTerm}&apikey=${avKey}`;
    fetch(url
        ).then((response)=>{
            return response.json();
        }).then((data)=>{
            setSearchResults(data.bestMatches.length<1? noResult : data.bestMatches.slice(0,6));
        });
    }


    
    return (
        <ClickAwayListener onClickAway={blurHandler}>
            <div  className={classes.textFieldInactive}>
                <Paper elevation={3} className={paperClass}>
                    <TextField
                        fullWidth
                        onClick={clickHandler}
                        value={input} 
                        onChange={searchHandler}
                        elevation={3}
                        placeholder="Search for stocks..."
                        variant='outlined'
                        inputRef={inputRef}
                        style={{ fontSize: '50px', width: '100%'}}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action"/>
                            </InputAdornment>
                            ),
                        }}
                    />
                </Paper>
                <div className={classes.listClass} style={{maxHeight: "300px"}}>
                    {listIsVisible? <SearchList   inputHandler={clearInput} searchResults={searchResults}/> : ''}
                </div>
            </div>
        </ClickAwayListener>
    )
}

export default LeftSearch;
