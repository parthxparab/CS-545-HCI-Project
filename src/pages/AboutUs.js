import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import logo from '../images/logo.png';

function AboutUs() {
  return (
    <div style={{ padding: '10px' }}>
      <Typography variant='body' component='p' align='center'>
        <Box fontWeight='fontWeightBold' fontFamily='Raleway' m={1}>
          <p>
            <br />
            In today’s ever changing environment, applying for relevant jobs and
            internships has become an everyday task for students and recent
            graduates. <br />
            <br />
            Most application and interview processes are now online thus making
            it very essential to keep track and note of the various updates to
            the applications sent via email. <br />
            <br />
            Jist (a Job List!) is an online job application tracker tool that
            keeps all of your application details in one page letting you access
            necessary information about every job, move them to the respective
            status the moment you get an update and delete them when you're done
            with it. <br />
            <br />
            Our goal is to help you land that dream job without you having to
            worry about remembering details all by yourself!
          </p>
        </Box>
      </Typography>
      <img src={logo} className='App-logo' alt='logo' />
      <Typography variant='body' component='p' align='center'>
        <Box fontWeight='fontWeightBold' fontFamily='Raleway' m={1}>
          <p>Made for you, by people like you!</p>
        </Box>
      </Typography>
      <Typography variant='body' component='p' align='center'>
        <Box fontWeight='fontWeightBold' fontFamily='Raleway' m={1}>
          <p>
            <br />
            The founders of this application are graduate students from Stevens
            Institute of Technology in New Jersey. <br />
            <br />
            Parth Parab, Manas Kulkarni, Prateek Jani, Sanket Patidar and Varsha
            Rao, all CS majors in the School of Engineering and Science.
          </p>
          <br />
          We have worked tirelessly for 4 months to bring this app to life and
          to help every struggling job/internship seeker out there to organize
          all of those crazy deadlines to Hackerranks, Zoom calls, HireVues and
          endless applications sent everyday and make one part of the process
          simpler.
        </Box>
      </Typography>
      <br /> <br /> <br /> <br />
      <div>
        {' '}
        <footer style={{ color: 'black', marginTop: '5px' }}>
          <div>
            <p> Made with ♥ by Jist | 2020 © All rights reserved </p>{' '}
          </div>{' '}
        </footer>
      </div>
    </div>
  );
}

export default AboutUs;
