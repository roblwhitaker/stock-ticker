import React from 'react'
import { useEffect, useState } from 'react';
import avKey from '../../keys/AV';
import DateChart from './DateChart';
import TimeChipList from './TimeChipList';
import { CircularProgress, Box, Typography } from '@material-ui/core';
import './LoadChart.css'
import {timeRanges} from '../../data/timeRanges';

function LoadChart(props) {
    const [selectedTimeRange, setSelectedTimeRange] = useState(timeRanges[2]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [chartData, setChartData] = useState([]);

    //FETCH CHART DATA FROM API
    useEffect(()=>{
        if (!props.symbol){
            return;
        }
        setIsLoading(true);
        setIsError(false);
        const interval = selectedTimeRange.interval? `&interval=${selectedTimeRange.interval}` : '';
        
        fetch(`https://www.alphavantage.co/query?function=${selectedTimeRange.avFunction}&symbol=${props.symbol}${interval}&apikey=${avKey}`
            ).then((response)=>{
                return response.json();
            }).then((data)=>{
                avTimeSeriesToChartData(data[selectedTimeRange.dataName],selectedTimeRange.trim);
            }).catch(error => {
                setIsError(true);
            });
    }, [props.symbol, selectedTimeRange]);

    //CHANGE WHICH TIME PERIOD IS SELECTED
    function handleTimeChipClick(period){
        const newPeriod = timeRanges.find(item => item.period === period);
        if(newPeriod.period === selectedTimeRange.period){
            return;
        }
        setSelectedTimeRange(newPeriod);
    }

    //CONVERT FETCHED DATA TO CHART DATA
    function avTimeSeriesToChartData(data,trim){

        const chartData = [[
            { type: 'date', id: 'Date' },
            { type: 'number', id: 'Close' }
        ]]
        Object.keys(data).forEach(key => {
            const date = new Date(key);
            chartData.push([
                date, 
                parseFloat(data[key]['4. close'])
            ]);
          });
          let firstDate = new Date(chartData[1][0]);
          firstDate.setDate(firstDate.getDate()-trim);
          
          let chartDataTrimmed = chartData.filter(dataPoint=>{
            return dataPoint[0] < firstDate? false : true;  
          });
          setChartData(chartDataTrimmed);
          setIsLoading(false);
          setIsError(false);
    }

    
    const loadingContent = (
        <Box style={{height:'200px', display:'flex',
        alignItems: 'center',
        justifyContent: 'center'}}>
        <CircularProgress  style={{'color': props.color}}/>
        </Box>
    )

    const chartContent = (
        <div className='fade-in'>
        <DateChart color={props.color} data={chartData} selectedTimeRange={selectedTimeRange}/>
        </div>
    )

    const errorContent = (
        <Box style={{height:'200px', display:'flex', padding: '16px',
        alignItems: 'center',
        justifyContent: 'center'}}>
            <Typography color='textSecondary'>No Data for this time range.</Typography>
        </Box>
    )

    let content = loadingContent;
    if (isError){
        content = errorContent
    } else if (!isLoading) {
        content = chartContent
    }
    
    return (
        <div>
            <TimeChipList
            onClick={handleTimeChipClick}
            timeRanges={timeRanges}
            selectedTimeRange={selectedTimeRange}
            />
            {content}
        </div>
    )
}

export default LoadChart
