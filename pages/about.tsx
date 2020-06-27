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
    <Button variant="contained" color="primary" component={Link} naked href="/">
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
      </Box>
    </Container>
  );
};

export default About;
