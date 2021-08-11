import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    width: '100%'
  },
});

function createData(index, name, peRatio, eps, marketCap, revenue, profit) {
  return {index, name, peRatio, eps, marketCap, revenue, profit };
}

function StockTable(props) {
  const classes = useStyles();
  const [rows, setRows] = useState([]);

  useEffect(()=>{
    let newRows =[];
    props.tableData.forEach(rowArray=>{
      newRows.unshift(createData(...rowArray));
    });

    const jsxRows = newRows.map((row) => (
        <TableRow >
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.peRatio}</TableCell>
          <TableCell align="right">{row.eps}</TableCell>
          <TableCell align="right">{row.marketCap}</TableCell>
          <TableCell align="right">{row.revenue}</TableCell>
          <TableCell align="right">{row.profit}</TableCell>
        </TableRow>
      ))
      setRows(jsxRows);
}, [props.tableData]);

  return (
    <TableContainer component={Paper} elevation={3} variant='elevation' dense>
      <Table className={classes.table} aria-label="simple table" size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Stock</TableCell>
            <TableCell align="right">EPS</TableCell>
            <TableCell align="right">PE Ratio</TableCell>
            <TableCell align="right">Market Cap</TableCell>
            <TableCell align="right">1Y Revenue</TableCell>
            <TableCell align="right">1Y Profit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody> 
          {rows}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StockTable