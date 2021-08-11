import React from 'react'
import SearchItem from './SearchItem'
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/paper';
import classes from './SearchList.module.css';

function SearchList(props) {
    return (
        <div className={classes.height}>
           <List className={classes.paperActive} dense={true}>
               <Paper elevation={3} className={classes.paperActive}>
                    {props.searchResults ? props.searchResults.map(object=>{
                        return (
                            <SearchItem 
                            style={{ zIndex: 10000}}
                            inputHandler={props.inputHandler}
                            key={object['1. symbol']}
                            symbol={object['1. symbol']}
                            name={object['2. name']}
                            />
                        );
                    }) : ''}
                </Paper>
            </List> 
        </div>
    )
}

export default SearchList
