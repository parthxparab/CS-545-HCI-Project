import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import AppliedComponent from '../Components/AppliedComponent';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import DeleteIcon from '@material-ui/icons/Delete';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import StarsIcon from '@material-ui/icons/Stars';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import axios from 'axios';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import Box from '@material-ui/core/Box';

import moment from 'moment';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

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
    margin: '4px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: '#ede1d4',
    color: '#2e3338',
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    marginRight: theme.spacing(2),
  },
  modal: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  modalButton: {
    margin: 16,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const statuses = [
  {
    status: 'Applied',
    cardColor: '#99ea9b',
  },
  {
    status: 'Interview',
    cardColor: '#79e27b',
  },
  {
    status: 'Accept',
    cardColor: '#58da5a',
  },
  {
    status: 'Reject',
    cardColor: '#f1856a',
  },
];

function Homepage(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(null);
  const [currentjob, setCurrentJob] = React.useState({});
  const [cName, setCName] = React.useState('');
  const [jTitle, setJTitle] = React.useState('');
  const [jDescription, setJDescription] = React.useState('');
  const [aLink, setAlink] = React.useState('');
  const [modalStyle] = React.useState(getModalStyle);
  const [gridJobData, setGridJobData] = useState([]);
  const [jNotes, setJnotes] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openWarning, setOpenWarning] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [snackText, setSnackText] = React.useState('');
  const [snackStatus, setSnackStatus] = React.useState('');

  useEffect(() => {
    console.log('render');
    async function fetchData() {
      try {
        axios.get('http://localhost:8000/api/job').then((response) => {
          setGridJobData(response.data);
        });
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  const handleOpen = () => {
    setOpen(true);
    // setCurrentJob(job);
  };

  const handleClose = () => {
    setOpen(false);
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
  const handleCloseTwo = () => {
    setAnchorEl(null);
  };

  const deleteJob = async (job) => {
    axios.delete('http://localhost:8000/api/job/' + String(job._id)).then(
      (response) => {
        console.log(response.data);
        axios.get('http://localhost:8000/api/job').then((response) => {
          setGridJobData(response.data);
        });
      },
      (error) => {
        console.log(error);
      }
    );
    handleWarningClose();
    handleCloseTwo();
    setSnackText('Job was Deleted Successfully!');
    setSnackStatus('error');
    handleClickSnack();
  };

  const updateStatus = async (job, status) => {
    console.log(job);
    let packet = {
      status: status,
      timeStamp: moment().format(' MMM DD YYYY'),
    };
    axios
      .patch('http://localhost:8000/api/job/status/' + String(job._id), packet)
      .then(
        (response) => {
          console.log(response.data);
          axios.get('http://localhost:8000/api/job').then((response) => {
            setGridJobData(response.data);
          });
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const addInformation = (e) => {
    // if (
    //   cName.length > 0 &&
    //   jTitle.length > 0 &&
    //   jDescription.length > 0 &&
    //   aLink.length > 0 &&
    //   jNotes.length > 0
    // ) {
    updateJobCard();
    // } else {
    // console.log(cName, jTitle, jDescription, aLink, jNotes);
    //   alert('Please enter all details!');
    // }
    setSnackText('Edit Changes were saved');
    setSnackStatus('success');
    handleClickSnack();

    handleClose();

    e.target.reset();
    e.preventDefault();
  };

  const handleClick = (job) => (event) => {
    // console.log('handleClick called! job: ', job);
    setCurrentJob(job);
    setAnchorEl(event.currentTarget);
  };

  const editCard = (
    <div style={modalStyle} className={classes.paper}>
      <form className={classes.modal} onSubmit={addInformation}>
        <div>
          <TextField
            id='outlined-textarea'
            label='Company Name'
            defaultValue={currentjob.companyName}
            multiline
            variant='outlined'
            onChange={(e) =>
              cName === ''
                ? setCName(currentjob.companyName)
                : setCName(e.target.value)
            }
          />
        </div>
        <div>
          <TextField
            id='outlined-textarea'
            label='Job Title'
            defaultValue={currentjob.jobTitle}
            multiline
            variant='outlined'
            onChange={(e) =>
              jTitle === ''
                ? setJTitle(currentjob.jobTitle)
                : setJTitle(e.target.value)
            }
          />
        </div>
        <div>
          <TextField
            id='outlined-textarea'
            label='Company Description'
            defaultValue={currentjob.description}
            multiline
            variant='outlined'
            onChange={(e) =>
              jDescription === ''
                ? setJDescription(currentjob.description)
                : setJDescription(e.target.value)
            }
          />
        </div>
        <div>
          <TextField
            id='outlined-textarea'
            label='Application link'
            defaultValue={currentjob.appLink}
            multiline
            variant='outlined'
            onChange={(e) =>
              aLink === ''
                ? setAlink(currentjob.appLink)
                : setAlink(e.target.value)
            }
          />
        </div>
        <div>
          <TextField
            id='outlined-textarea'
            label='Notes'
            defaultValue={currentjob.notes}
            multiline
            variant='outlined'
            onChange={(e) =>
              jNotes === ''
                ? setJnotes(currentjob.notes)
                : setJnotes(e.target.value)
            }
          />
        </div>
        <Button
          className={classes.modalButton}
          variant='contained'
          color='primary'
          size='small'
          type='submit'
        >
          Apply
        </Button>
        <Button
          onClick={() => {
            handleClose();
            handleCloseTwo();
          }}
          className={classes.modalButton}
          variant='contained'
          color='primary'
          size='small'
        >
          Cancel
        </Button>
      </form>
    </div>
  );

  async function editData(packet, id) {
    packet['timeStamp'] = moment().format(' MMM DD YYYY');

    axios.patch(`http://localhost:8000/api/job/${id}`, packet).then(
      (response) => {
        console.log(response.data);
        axios.get('http://localhost:8000/api/job').then((response) => {
          setGridJobData(response.data);
        });
      },
      (error) => {
        console.log(error);
      }
    );
    handleCloseTwo();
  }

  const updateJobCard = () => {
    let editJobs = gridJobData;
    editJobs = editJobs.map((item) => {
      if (item === currentjob) {
        item.companyName = cName.length > 0 ? cName : currentjob.companyName;
        item.jobTitle = jTitle.length > 0 ? jTitle : currentjob.jobTitle;
        item.description =
          jDescription.length > 0 ? jDescription : currentjob.description;
        item.appLink = aLink.length > 0 ? aLink : currentjob.appLink;
        item.notes = jNotes.length > 0 ? jNotes : currentjob.notes;
        setCName('');
        setJTitle('');
        setJDescription('');
        setAlink('');
        setJnotes('');
        return item;
      }
      return item;
    });
    editData(editJobs[0], editJobs[0]._id);
  };

  const getButtons = (status, job) => {
    if (status === 'Applied') {
      return (
        <div>
          <LightTooltip title='Inteview'>
            <IconButton
              onClick={() => {
                updateStatus(job, 'Interview');
              }}
            >
              <PeopleAltIcon />
            </IconButton>
          </LightTooltip>
          <LightTooltip title='Accept'>
            <IconButton
              onClick={() => {
                updateStatus(job, 'Accept');
              }}
            >
              <StarsIcon />
            </IconButton>
          </LightTooltip>
          <LightTooltip title='Reject'>
            <IconButton
              onClick={() => {
                updateStatus(job, 'Reject');
              }}
            >
              <NewReleasesIcon />
            </IconButton>
          </LightTooltip>
        </div>
      );
    } else if (status === 'Interview') {
      return (
        <div>
          <LightTooltip title='Applied'>
            <IconButton
              onClick={() => {
                updateStatus(job, 'Applied');
              }}
            >
              <BookmarksIcon />
            </IconButton>
          </LightTooltip>
          <LightTooltip title='Accept'>
            <IconButton
              onClick={() => {
                updateStatus(job, 'Accept');
              }}
            >
              <StarsIcon />
            </IconButton>
          </LightTooltip>
          <LightTooltip title='Reject'>
            <IconButton
              onClick={() => {
                updateStatus(job, 'Reject');
              }}
            >
              <NewReleasesIcon />
            </IconButton>
          </LightTooltip>
        </div>
      );
    } else if (status === 'Accept') {
      return (
        <div>
          <LightTooltip title='Applied'>
            <IconButton
              onClick={() => {
                updateStatus(job, 'Applied');
              }}
            >
              <BookmarksIcon />
            </IconButton>
          </LightTooltip>
          <LightTooltip title='Inteview'>
            <IconButton
              onClick={() => {
                updateStatus(job, 'Interview');
              }}
            >
              <PeopleAltIcon />
            </IconButton>
          </LightTooltip>
          <LightTooltip title='Reject'>
            <IconButton
              onClick={() => {
                updateStatus(job, 'Reject');
              }}
            >
              <NewReleasesIcon />
            </IconButton>
          </LightTooltip>
        </div>
      );
    } else {
      return (
        <div>
          <LightTooltip title='Applied'>
            <IconButton
              onClick={() => {
                updateStatus(job, 'Applied');
              }}
            >
              <BookmarksIcon />
            </IconButton>
          </LightTooltip>
          <LightTooltip title='Inteview'>
            <IconButton
              onClick={() => {
                updateStatus(job, 'Interview');
              }}
            >
              <PeopleAltIcon />
            </IconButton>
          </LightTooltip>
          <LightTooltip title='Accept'>
            <IconButton
              onClick={() => {
                updateStatus(job, 'Accept');
              }}
            >
              <StarsIcon />
            </IconButton>
          </LightTooltip>
        </div>
      );
    }
  };

  const handleWarningOpen = () => {
    setOpenWarning(true);
  };

  const handleWarningClose = () => {
    setOpenWarning(false);
  };

  const deleteWarning = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id='simple-modal-title'>
        Are you sure you want to permanently delete?
      </h2>
      <Button
        onClick={() => {
          deleteJob(currentjob);
        }}
        variant='contained'
        color='secondary'
        className={classes.button}
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
      <Button
        onClick={() => {
          handleWarningClose();
          handleCloseTwo();
        }}
        variant='contained'
        color='secondary'
        className={classes.button}
        startIcon={<CancelIcon />}
      >
        Cancel
      </Button>
    </div>
  );

  const displayJobs = (s) => {
    // return jobData
    return gridJobData
      .filter((job) => s.status === job.status)
      .map((job, index) => {
        return (
          <Card
            style={{ backgroundColor: s.cardColor }}
            key={index}
            className={classes.root}
          >
            <CardHeader
              avatar={
                <Avatar aria-label='recipe' className={classes.avatar}>
                  {job.companyName[0]}
                </Avatar>
              }
              action={
                <div>
                  <LightTooltip title='Edit'>
                    <IconButton
                      aria-label='settings'
                      aria-controls='simple-menu'
                      aria-haspopup='true'
                      onClick={handleClick(job)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </LightTooltip>

                  <Menu
                    id='simple-menu'
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleCloseTwo}
                  >
                    <MenuItem onClick={handleOpen}>
                      <EditIcon
                        fontSize='small'
                        marginleft='10px'
                        style={{ marginRight: '2px' }}
                      />
                      Edit
                    </MenuItem>
                    <MenuItem
                      onClick={handleWarningOpen}
                      // onClick={() => {
                      // 	deleteJob(currentjob);
                      // }}
                    >
                      <DeleteIcon
                        fontSize='small'
                        marginleft='10px'
                        style={{ marginRight: '2px' }}
                      />
                      Delete
                    </MenuItem>{' '}
                  </Menu>
                  <Modal
                    open={openWarning}
                    onClose={handleWarningClose}
                    aria-labelledby='simple-modal-title'
                    aria-describedby='simple-modal-description'
                    animation='false'
                  >
                    {deleteWarning}
                  </Modal>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='simple-modal-title'
                    aria-describedby='simple-modal-description'
                    animation='false'
                  >
                    {editCard}
                  </Modal>
                </div>
              }
              title={job.companyName}
              titleTypographyProps={{ variant: 'h6' }}
              subheader={job.jobTitle}
              align='left'
            />

            <CardActions>
              {getButtons(s.status, job)}
              <LightTooltip title='More Details'>
                <IconButton
                  // style={{ edge: "end" }}
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: activeIndex === job._id,
                  })}
                  onClick={() => {
                    setActiveIndex(activeIndex === job._id ? null : job._id);
                  }}
                  aria-expanded={activeIndex === job._id}
                  aria-label='show more'
                >
                  <ExpandMoreIcon />
                </IconButton>
              </LightTooltip>
            </CardActions>

            <Typography variant='body2' component='p' align='center'>
              <Box fontStyle='italic' m={1}>
                Last updated: {job.timeStamp}
              </Box>
            </Typography>

            <Collapse in={activeIndex === job._id} timeout='auto' unmountOnExit>
              <CardContent>
                <Typography variant='body2' component='p' align='left'>
                  Job description: {job.description}
                </Typography>

                <Typography variant='body2' component='p' align='left'>
                  Job link: {job.appLink}
                </Typography>
                <Typography paragraph>Notes: {job.notes}</Typography>
              </CardContent>
            </Collapse>
          </Card>
        );
      });
  };

  return (
    <div>
      <Grid container spacing={2}>
        {statuses.map((s, idx) => {
          return (
            <Grid
              item
              xs={3}
              style={{
                height: '100vh',
                boxShadow: '1px 3px 1px #9E9E9E',
                padding: '6px',
                backgroundColor: '#f8f8f8',
              }}
              key={idx}
            >
              <AppliedComponent
                status={s.status}
                icon={s.svgIcon}
                getData={setGridJobData}
              />
              {/* {jobData.length > 0 ? <ul>{displayJobs(s)}</ul> : null} */}
              {gridJobData.length > 0 ? <ul>{displayJobs(s)}</ul> : null}
            </Grid>
          );
        })}
      </Grid>
      <Snackbar
        style={{ width: '100%', padding: 0, margin: 0 }}
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity={snackStatus}>
          {snackText}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Homepage;
