import React, {useState, useEffect} from 'react'
import { Chip } from '@material-ui/core'

function TimeChip(props) {
    const [isSelected,setIsSelected] = useState(props.selectedTimeRange.period === props.chipText? 'default' : 'outlined');
    
    //CHANGE COLOR WHEN SELECTED
    useEffect(()=>{
        let newColor = props.selectedTimeRange.period === props.chipText? 'default' : 'outlined';
        if(newColor===isSelected){
            return;
        } else {
            setIsSelected(newColor);
        }
    }, [props.selectedTimeRange.period]);

    //TRIGGERS HANDLECHIPCLICK IN LOADCHART.JS
    function clickHandler(){
        props.onClick(props.chipText);
    }
   
    return (
        <Chip 
        variant={isSelected}  
        size='small' 
        label={props.chipText} 
        onClick={clickHandler} 
        clickable>
        </Chip>
    )
}

export default TimeChip
