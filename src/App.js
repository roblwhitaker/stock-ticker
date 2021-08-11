
import StockView from './views/StockView';
import TableLoader from './components/table/TableLoader';
import Layout from './views/Layout';
import Grid from '@material-ui/core/grid';
import { StocksContextProvider } from './store/stocks-context';
import { ThemeProvider, createTheme } from '@material-ui/core';
import './App.css';

const THEME = createTheme({
  typography: {
   fontFamily: ["Roboto", "Helvetica", "Arial"].join(','),
  },
});

function App() {  
  return (
    <div className="App">
      <StocksContextProvider>
        <ThemeProvider theme={THEME}>
        <Layout>
          <Grid container spacing={2} style={{maxWidth: '947px', margin: 'auto'}}>
            <Grid item xs={12} sm={12} md={12}>
              <StockView/>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TableLoader/>
            </Grid>
          </Grid>
        </Layout>
        </ThemeProvider>
      </StocksContextProvider>
    </div>
  );
}

export default App;
