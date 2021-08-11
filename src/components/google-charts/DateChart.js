import React from 'react'
import Chart from "react-google-charts";

function DateChart(props) {
    return (
            <Chart
              width={'300'}
              height={'500'}
              chartType="LineChart"
              data={props.data}
              curveType= "function"
              options={{
                width: '100%',
                height: 200,
                chartArea: {'width': '100%', 'height': '92%', top:'0'},
                legend: { position: 'none' },
                lineWidth: '5',
                curveType: 'function',
                colors: [props.color],
                vAxis: {
                    textPosition: 'in',
                    gridlines: {count: 4},
                    minorGridlines: {count: 0},
                    textStyle: {  
                      fontName: 'Roboto',
                      bold: false, 
                      fontSize: '12' }
                },
                hAxis: {
                    textPosition: 'out',
                    format: props.selectedTimeRange? props.selectedTimeRange.format: 'dd',
                    gridlines: {count: 5},
                    textStyle: {  
                      fontName: 'Roboto',
                      bold: false, 
                      fontSize: '12' }
                  },
                
              }}
              rootProps={{ 'data-testid': '4' }}
            />
    )
}

export default DateChart
