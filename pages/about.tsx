/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Link from '@/src/components/Link';
import Head from 'next/head';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    '@global': {
      body: {
        transition: theme.transitions.create('background-color'),
      },
    },
  }),
);

const About: React.FC = () => {
  const renderBtn = () => (
    // @ts-ignore
    <Button variant="contained" color="primary" component={Link} naked href="/">
      Go to the main page
    </Button>
  );

  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Head>
        <title>About</title>
      </Head>
      <Box sx={{ my: 4 }}>
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
          Because index calls api for ip info, so it&apos;s not instantly.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
