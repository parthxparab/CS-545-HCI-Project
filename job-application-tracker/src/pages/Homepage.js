import React, { useState, useEffect, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import AppliedComponent from "../Components/AppliedComponent";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import DeleteIcon from "@material-ui/icons/Delete";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";

import axios from "axios";

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

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "4px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "#ede1d4",
    color: "#2e3338",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  modalButton: {
    margin: 16,
  }
}));

const statuses = [
  {
    status: "Applied",
    cardColor: "#99ea9b",
  },
  {
    status: "Interview",
    cardColor: "#79e27b",
  },
  {
    status: "Accept",
    cardColor: "#58da5a",
  },
  {
    status: "Reject",
    cardColor: "#f1856a",
  },
];

function Homepage(props) {
  const [jobData, setJobData] = React.useState([]);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(null);
  const [currentjob, setCurrentJob] = React.useState({});
  const [cName, setCName] = React.useState("");
  const [jTitle, setJTitle] = React.useState("");
  const [jDescription, setJDescription] = React.useState("");
  const [aLink, setAlink] = React.useState("");
  const [modalStyle] = React.useState(getModalStyle);
  const [gridJobData, setGridJobData] = useState([]);
  const [jNotes, setJnotes] = React.useState("");

  useEffect(() => {
    console.log("render");
    async function fetchData() {
      try {
        axios.get("http://localhost:8000/api/job").then((response) => {
          console.log(response.data);
          setGridJobData(response.data);
        });
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  const handleOpen = (job) => {
    setOpen(true);
    setCurrentJob(job);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteJob = async (job) => {
    axios.delete("http://localhost:8000/api/job/" + String(job._id)).then(
      (response) => {
        console.log(response.data);
        axios.get("http://localhost:8000/api/job").then((response) => {
          setGridJobData(response.data);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const addInformation = (e) => {
    if (cName !== "" || jTitle !== "" || jDescription !== "" || aLink !== "") {
      updateJobCard();
    } else {
      alert("Please enter all details!");
    }

    handleClose();

    e.target.reset();
    e.preventDefault();
  };

  const editCard = (
    <div style={modalStyle} className={classes.paper}>
      <form className={classes.modal} onSubmit={addInformation}>
        <div>
          <TextField
            id="outlined-textarea"
            label="Company Name"
            defaultValue={currentjob.companyName}
            multiline
            variant="outlined"
            onChange={(e) => setCName(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="outlined-textarea"
            label="Job Title"
            defaultValue={currentjob.jobTitle}
            multiline
            variant="outlined"
            onChange={(e) => setJTitle(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="outlined-textarea"
            label="Company Description"
            defaultValue={currentjob.description}
            multiline
            variant="outlined"
            onChange={(e) => setJDescription(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="outlined-textarea"
            label="Application link"
            defaultValue={currentjob.appLink}
            multiline
            variant="outlined"
            onChange={(e) => setAlink(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="outlined-textarea"
            label="Notes"
            defaultValue={currentjob.notes}
            multiline
            variant="outlined"
            onChange={(e) => setJnotes(e.target.value)}
          />
        </div>
        <Button className={classes.modalButton} variant="contained" color="primary" size="small" type="submit">
          Edit
        </Button>
        <Button className={classes.modalButton} variant="contained" color="primary" size="small" onClick={handleClose}>
          Cancel
        </Button>
      </form>
    </div>
  );

  const updateJobCard = () => {
    let editJobs = jobData;

    editJobs = editJobs.map((item) => {
      if (item === currentjob) {
        console.log(item);
        item.companyName = cName.length > 0 ? cName : currentjob.companyName;
        item.jobTitle = jTitle.length > 0 ? jTitle : currentjob.jobTitle;
        item.jobDescription =
          jDescription.length > 0 ? jDescription : currentjob.jobDescription;
        item.appLink = aLink.length > 0 ? aLink : currentjob.appLink;
        item.notes = jNotes.length > 0 ? jNotes : currentjob.notes;
        setCName("");
        setJTitle("");
        setJDescription("");
        setAlink("");
        setJnotes("");
        return item;
      }
      return item;
    });

    setJobData(editJobs); // Modifying the state in this current component
  };

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
                <Avatar aria-label="recipe" className={classes.avatar}>
                  {job.companyName[0]}
                </Avatar>
              }
              action={
                <div>
                  

                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    animation="false"
                  >
                    {editCard}
                  </Modal>
                </div>
              }
              title={job.companyName}
              titleTypographyProps={{ variant: "h6" }}
              subheader={job.jobTitle}
              align="left"
            />

            {/* <CardContent>
              <Typography
                variant="subtitle1"
                align="left"
                fontWeight="fontWeightBold">
                {job.jobTitle}
              </Typography>
              
            </CardContent> */}

            <CardActions disableSpacing>
            <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={() => handleOpen(job)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      deleteJob(job);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>

              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: activeIndex === index,
                })}
                onClick={() => {
                  setActiveIndex(activeIndex === index ? null : index);
                }}
                aria-expanded={activeIndex === index}
                aria-label="show more"
              >
                <ExpandMoreIcon />
            </IconButton>
        </CardActions>

            <Collapse in={activeIndex === index} timeout="auto" unmountOnExit>
              <CardContent>
              <Typography variant="body2" component="p" align="left">

    Job description: {job.description}
</Typography>

<Typography variant="body2" component="p" align="left">

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
                height: "100vh",
                boxShadow: "1px 3px 1px #9E9E9E",
                padding: "6px",
                backgroundColor: "#f8f8f8",
              }}
              key={idx}
            >
              <AppliedComponent status={s.status} getData={setGridJobData} />
              {/* {jobData.length > 0 ? <ul>{displayJobs(s)}</ul> : null} */}
              {gridJobData.length > 0 ? <ul>{displayJobs(s)}</ul> : null}
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default Homepage;
