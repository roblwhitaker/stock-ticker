import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { popularStocks } from '../../data/popularChipData';
import StocksContext from '../../store/stocks-context';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function ChipsArray() {
  const stocksCtx = useContext(StocksContext);
  const classes = useStyles();

  const handleAdd = (chipToAdd) => () => {
      stocksCtx.addStock( chipToAdd.label, chipToAdd.key);
  };

  return (
    <ul component="ul" className={classes.root}>
      {popularStocks.map((data) => {
        return (
          <li key={data.label} style={{zIndex:'0'}}>
            <Chip
              label={data.label}
              onClick={handleAdd(data)}
              className={classes.chip}
            />
          </li>
        );
      })}
    </ul>
  );
}