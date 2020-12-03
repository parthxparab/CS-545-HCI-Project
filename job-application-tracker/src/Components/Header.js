import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import HelpIcon from "@material-ui/icons/Help";
import InfoIcon from "@material-ui/icons/Info";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    color: "#2e3338",
    backgroundColor: "#ede1d4",
  },
  bar: {
    backgroundColor: "#ede1d4",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  button: {
    color: "#2e3338",
  },
}));

function Header(props) {
  const { setOpen } = props;
  const classes = useStyles();

	return (
		<div>
			<AppBar className={classes.bar}>
				<Toolbar>
					<Typography variant='h2' className={classes.title}>
						Application Tracker
					</Typography>
					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						<Button
							onClick={() => {
								setOpen('Home');
							}}
							variant='contained'
							className={classes.button}
							startIcon={<HomeIcon />}
						>
							Home
						</Button>
						<Button
							onClick={() => {
								setOpen('Help');
							}}
							variant='contained'
							className={classes.button}
							startIcon={<HelpIcon />}
						>
							Help
						</Button>
						<Button
							onClick={() => {
								setOpen('AboutUs');
							}}
							variant='contained'
							className={classes.button}
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
