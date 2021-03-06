import React from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import StarsIcon from '@material-ui/icons/Stars';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import axios from 'axios';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

// import JobCard from "./JobCard";
const LightTooltip = withStyles((theme) => ({
	tooltip: {
		backgroundColor: theme.palette.common.white,
		color: 'rgba(0, 0, 0, 0.87)',
		boxShadow: theme.shadows[1],
		fontSize: 11,
	},
}))(Tooltip);

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: 200,
			'& > * + *': {
				marginTop: theme.spacing(2),
			},
		},
	},
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		margin: theme.spacing(1),
	},
	button: {
		backgroundColor: '#ede1d4',
		color: '#2e3338',
	},
	modalButton: {
		margin: 16,
	},
}));

export default function AppliedComponent(props) {
	const classes = useStyles();

	const { getData } = props;
	const [open, setOpen] = React.useState(false);
	const [companyName, setCompanyName] = React.useState('');
	const [jobTitle, setJobTitle] = React.useState('');
	const [jobDescription, setJobDescription] = React.useState('');
	const [modalStyle] = React.useState(getModalStyle);
	const [appLink, setAppLink] = React.useState('');
	const [notes, setNotes] = React.useState('');
	const [openSnack, setOpenSnack] = React.useState(false);

	const _checkInformationValid = () => {
		if (companyName !== '' && jobTitle !== '') {
			return true;
		} else {
			return false;
		}
	};
	async function postData(packet) {
		axios.post('http://localhost:8000/api/job', packet).then(
			(response) => {
				console.log(response.data);
				axios.get('http://localhost:8000/api/job').then((response) => {
					getData(response.data);
				});
				handleClickSnack();
			},
			(error) => {
				console.log(error);
			}
		);
	}
	const addInformation = (e) => {
		if (_checkInformationValid() === true) {
			let packet = {
				companyName: companyName,
				jobTitle: jobTitle,
				description: jobDescription !== '' ? jobDescription : ' ',
				timeStamp: moment().format(' MMM DD YYYY'),
				notes: notes !== '' ? notes : ' ',
				appLink: appLink !== '' ? appLink : ' ',
				status: props.status,
			};

			postData(packet);

			setCompanyName('');
			setJobTitle('');
			setJobDescription('');
			setAppLink('');
			setNotes('');
		} else {
			alert('Please provide all the details');
		}

		handleClose();

		e.target.reset(); //To go back to the default textField of the form.
		e.preventDefault(); //To Stop reloading the page as it is a form.
	};
	const handleOpen = () => {
		setOpen(true);
	};

	const handleClickSnack = () => {
		setOpenSnack(true);
	};
	const handleCloseSnack = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenSnack(false);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const body = (
		<div style={modalStyle} className={classes.paper}>
			<form className={classes.root} onSubmit={addInformation}>
				<div>
					<h2 id='simple-modal-title'>Enter all the details</h2>
					<TextField
						id='outlined-textarea'
						label='Company Name'
						placeholder='Enter Company Name'
						multiline
						variant='outlined'
						onChange={(e) => setCompanyName(e.target.value)}
					/>
				</div>
				<div>
					<TextField
						id='outlined-textarea'
						label='Job Title'
						placeholder='Enter Job Title'
						multiline
						variant='outlined'
						onChange={(e) => setJobTitle(e.target.value)}
					/>
				</div>
				<div>
					<TextField
						id='outlined-textarea'
						label='Job description'
						placeholder='Enter job description'
						multiline
						variant='outlined'
						onChange={(e) => setJobDescription(e.target.value)}
					/>
				</div>
				<div>
					<TextField
						id='outlined-textarea'
						label='Application link'
						placeholder='Enter application Link'
						multiline
						variant='outlined'
						onChange={(e) => setAppLink(e.target.value)}
					/>
				</div>
				<div>
					<TextField
						id='outlined-textarea'
						label='Notes'
						placeholder='Enter notes'
						multiline
						variant='outlined'
						onChange={(e) => setNotes(e.target.value)}
					/>
				</div>
				{/* <div className={classes.modalButton}> */}
				<Button
					className={classes.modalButton}
					variant='contained'
					color='primary'
					size='small'
					type='submit'
				>
					Save
				</Button>
				<Button
					className={classes.modalButton}
					variant='contained'
					color='primary'
					size='small'
					onClick={handleClose}
				>
					Cancel
				</Button>
				{/* </div> */}
			</form>
		</div>
	);

	// const getIcon = (props.status==='Applied'?<BookmarksIcon/>:(props.status==='Interview'?<PeopleAltIcon/>:(props.status==='Accept'?<StarsIcon/>:<NewReleasesIcon/>)))
	var getIcon;
	if (props.status === 'Applied') {
		getIcon = <BookmarksIcon />;
	} else if (props.status === 'Interview') {
		getIcon = <PeopleAltIcon />;
	} else if (props.status === 'Accept') {
		getIcon = <StarsIcon />;
	} else {
		getIcon = <NewReleasesIcon />;
	}
	return (
		<div className='OuterBody'>
			<div className='InnerBody'>
				<h1>
					{props.status} {getIcon}{' '}
				</h1>
				<LightTooltip title='Add new job'>
					<IconButton
						onClick={handleOpen}
						className={classes.button}
						variant='contained'
						size='medium'
					>
						<AddIcon />
					</IconButton>
				</LightTooltip>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby='simple-modal-title'
					aria-describedby='simple-modal-description'
					animation='false'
				>
					{body}
				</Modal>
			</div>
			<Snackbar
				style={{ width: '100%', padding: 0, margin: 0 }}
				open={openSnack}
				autoHideDuration={2500}
				onClose={handleCloseSnack}
			>
				<Alert onClose={handleCloseSnack} severity='success'>
					New Job Card Added Successfully!
				</Alert>
			</Snackbar>{' '}
		</div>
	);
}
