/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Link from '@/src/components/Link';

const About: React.FC = () => {
  const renderBtn = () => (
    // @ts-ignore
    <Button variant="contained" color="primary" component={Link} naked href="/test">
      Go to the main page
    </Button>
  );
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Link example
        </Typography>
        {renderBtn()}
        <Typography
          variant="body1"
          style={{ fontSize: 17, lineHeight: 1.47059, fontWeight: 400, letterSpacing: '-.022em' }}
          component="h1"
          gutterBottom
        >
          Because index page is Server λ, unlike this page is a static page, so cannot jump to each
          other instantly.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
