import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HelpIcon from '@material-ui/icons/Help';
import InfoIcon from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

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
	const { setOpen } = props;
	const classes = useStyles();

	return (
		<div>
			<AppBar className={classes.bar}>
				<Toolbar>
					<Button
						onClick={() => {
							setOpen('Home');
						}}
						color='default'
					>
						<Box
							fontWeight='fontWeightBold'
							fontSize='h5.fontSize'
							textAlign='left'
							fontFamily='"Helvetica Neue"'
							m={1}
						>
							TRACE
						</Box>
					</Button>

					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						<Button
							onClick={() => {
								setOpen('Help');
							}}
							color='default'
							startIcon={<HelpIcon />}
						>
							Help
						</Button>
						<Button
							onClick={() => {
								setOpen('AboutUs');
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

export default Header;
