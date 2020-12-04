import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HelpIcon from '@material-ui/icons/Help';
import InfoIcon from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, withRouter } from 'react-router-dom';

import logo from '../images/logo.png';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    color: '#2e3338',
    backgroundColor: '#ede1d4',
  },
  bar: {
    backgroundColor: '#ede1d4',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  button: {
    color: '#2e3338',
  },
}));

function Header(props) {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div>
      <AppBar className={classes.bar}>
        <Toolbar>
          <IconButton
            onClick={() => {
              history.push('/app');
            }}
            color='default'
          >
            {' '}
            <img
              src={logo}
              className='App-logo'
              alt='logo'
              height='40'
              width='80'
            />
            {/* <Box
							fontWeight='fontWeightBold'
							fontSize='h5.fontSize'
							textAlign='left'
							fontFamily='"Helvetica Neue"'
							m={1}
						>
							TRACE
						</Box> */}
          </IconButton>
          <Box fontFamily='Raleway' m={1} color='black'>
            The Job Application Tracker
          </Box>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Button
              onClick={() => {
                history.push('/help');
              }}
              color='default'
              startIcon={<HelpIcon />}
            >
              Help
            </Button>
            <Button
              onClick={() => {
                history.push('/about');
              }}
              color='default'
              startIcon={<InfoIcon />}
            >
              About Us
            </Button>
          </div>
          <div className={classes.sectionMobile}></div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Header);
