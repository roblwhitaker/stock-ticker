import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function ErrorSnackBar(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
      setOpen(true);
  }, [props.message])

  return (
    <div className={classes.root}>
      <Snackbar 
      open={open} 
      autoHideDuration={3000} 
      onClose={handleClose} 
      anchorOrigin={{vertical: 'bottom',horizontal: 'left' }}>
        <Alert onClose={handleClose} severity="warning">
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}