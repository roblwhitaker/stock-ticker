import React from 'react'
import {  Container, Grid} from '@material-ui/core'
import TimeChip from './TimeChip'

function TimeChipList(props) {
    return (
        <Container style={{margin: 'auto', marginBottom:'10px', padding: '16px', paddingTop:'0px', paddingBottom:'0px'}}>
            <Grid spacing={1} container justifyContent='space-between' alignContent='space-around'>
                {props.timeRanges.map(object=>{
                    return (
                    <Grid item>
                        <TimeChip 
                            onClick={props.onClick} 
                            selectedTimeRange={props.selectedTimeRange}
                            chipText={object.period}
                        />
                    </Grid>);
                })}
            </Grid>
        </Container>
    )
}

export default TimeChipList
