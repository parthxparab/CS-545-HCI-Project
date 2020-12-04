import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import logo from '../images/logo.png';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useHistory, withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function Landing() {
  const history = useHistory();

  const classes = useStyles();

  return (
    <div>
      {' '}
      <Grid
        container
        spacing={2}
        justify='center'
        alignItems='center'
        style={{
          minHeight: '100vh',
          width: '100vw',
          background: 'url(/img/intro-bg.jpg)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
        wrap
      >
        <div>
          <div>
            {' '}
            <img src={logo} className='App-logo' alt='logo' />
          </div>
          <Typography variant='body' component='p' align='center'>
            <Box
              fontWeight='fontWeightThin'
              fontFamily='Raleway'
              m={1}
              fontSize={32}
            >
              <p>The Job Application Tracker</p>
            </Box>
          </Typography>
          <Button
            onClick={() => {
              history.push('/app');
            }}
            variant='contained'
            size='large'
            color='#2E3338'
            disableElevation
            className={classes.button}
            style={{ padding: '5px 25px', borderRadius: '20px' }}
            endIcon={<ArrowForwardIosIcon />}
          >
            Get Started
          </Button>
          <br />
          <br />
        </div>
      </Grid>
    </div>
  );
}
export default Landing;
