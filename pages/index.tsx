import Head from 'next/head';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IncomingMessage } from 'http';
interface HomeProps {
  ip: string;
  extraInfo: string;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      minHeight: '100vh',
      padding: '0 0.5rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',

      '& main': {
        padding: '5rem 0',
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      '& footer': {
        width: '100%',
        height: '100px',
        borderTop: '1px solid #eaeaea',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& img': {
          marginLeft: '0.5rem',
        },
        '& a': {
          fontSize: '1rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      },
      '& a': {
        color: 'inherit',
        textDecoration: 'none',
      },
    },

    title: {
      margin: 0,
      lineHeight: 1.15,
      fontSize: '4rem',
    },
    subtitle: {
      fontSize: '1.5rem',
    },
    logo: {
      height: '1em',
    },
    table: {},
  }),
);

export const Home: React.FC<HomeProps> = ({ ip, extraInfo }): JSX.Element => {
  useEffect(() => {
    console.log('extra', extraInfo);
  });
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Head>
        <title>Crystal</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="network utilities for developers" />
      </Head>

      <main>
        <h1 className={classes.title}>Welcome to Crystal.</h1>
        <h2 className={classes.subtitle}>
          Your IP: <span className="ip-addr">{ip}</span>
        </h2>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Key</TableCell>
                <TableCell align="right">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(extraInfo).map(([k, v]) => (
                <TableRow key={k}>
                  <TableCell component="th" scope="row">
                    {k}
                  </TableCell>
                  <TableCell align="right">{'' + v}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>

      <footer>
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
          Powered by <img src="/vercel.svg" alt="Vercel Logo" className={classes.logo} />
        </a>
      </footer>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req }: { req: IncomingMessage } = context;
  const ip = req.headers['x-forwarded-for'];

  if (!ip) return { props: {} };

  const res = await axios.get(`https://ipinfo.io/${ip}/json`);
  const extra = res.data || {};

  return {
    props: {
      ip: req.headers['x-forwarded-for'],
      extraInfo: extra,
    },
  };
};
