import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function Help() {
  return (
    <div style={{ padding: '10px' }}>
      <Typography variant='body' component='p' align='center'>
        <Box fontWeight='fontWeightBold' fontFamily='Raleway' m={1}>
          <p>
            <br />
            Our page is easy to navigate and understand. If there are any issues
            with figuring out certain buttons/features, move your mouse to the
            target and hover over it to view it's function. <br />A few simple
            explanations to some of our features:
          </p>
        </Box>
      </Typography>
      <Typography variant='body' align='justify'>
        <Box fontFamily='Raleway' m={1}>
          <ol style={{ paddingRight: '40px' }}>
            <li>
              We have four job status sections. Right below the headings that
              say Applied, Interview, Accept and Reject, click on the "+" to add
              a job card to that particular section
            </li>
            <br />
            <li>
              The "+" opens the edit section that lets you input important
              information about your job application. Add any extra relevant
              information in notes.
            </li>
            <br />

            <li>
              After you have job cards in each respective category, access the
              extra information on notes by clicking on the "v" drop down that
              displays more information about your job.
            </li>
            <br />

            <li>
              The edit button represented by a pen on top left lets you change
              information pertaining to your application. You can choose to
              cancel the edits after opening the section as well. The delete
              button represented by a bin on the top left lets you delete the
              job card. The delete however reconfirms the action through a
              popup.
            </li>
            <br />

            <li>
              The job card can be moved from one job status column to the other
              (like when you get that much anticipated email that the dream job
              you applied to has invited you for an interview). Click on the
              appropriate button to move the job from one column to the other.
              Follow the symbol on the job status header on each column to find
              out what each symbol represents.{' '}
            </li>
          </ol>
        </Box>
      </Typography>
      <br />
      <br />
      <br />
      <Typography
        variant='body'
        component='p'
        align='left'
        style={{ marginLeft: '20px' }}
      >
        <Box fontWeight='fontWeightBold' fontFamily='Raleway' m={1}>
          <p>
            In case of technical difficulty accessing our page, contact: <br />
            Parth Parab <br />
            <a href='mailto:pparab@stevens.edu'>pparab@stevens.edu</a>
            <br /> Jersey City, <br />
            NJ, 07307 USA
          </p>
        </Box>
      </Typography>
      <br /> <br /> <br />
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

export default Help;
