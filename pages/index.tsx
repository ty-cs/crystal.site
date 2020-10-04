import Head from 'next/head';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IncomingMessage } from 'http';
import isEmpty from 'lodash/isEmpty';
import CallMadeRoundedIcon from '@material-ui/icons/CallMadeRounded';
import { countryCodeEmoji } from '@/src/utils/flags';
import { IconButton } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Brightness7RoundedIcon from '@material-ui/icons/Brightness7Rounded';
import Brightness4RoundedIcon from '@material-ui/icons/Brightness4Rounded';
import AppContainer from '@/src/components/AppContainer';
import NoSsr from '@material-ui/core/NoSsr';

interface HomeProps {
  ip: string;
  extraInfo: string;
  toggleTheme: () => void;
  prefersDarkMode: boolean;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    '@global': {
      '#main-content': {
        outline: 0,
      },
    },
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      '& main': {
        paddingBottom: theme.spacing(8),
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      '& footer': {
        width: '100%',
        height: '100px',
        borderTop: `1px solid ${theme.palette.divider}`,
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
      filter: theme.palette.type === 'dark' ? 'drop-shadow(0 0 4px white)' : 'unset',
    },
    table: {
      '& tbody tr:last-child': {
        '& th,td': {
          borderBottom: 'none',
        },
      },
    },
    locLink: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },

    icon: {
      width: 20,
      height: 20,
    },
    header: {
      display: 'flex',
      width: '100%',
    },
    grow: {
      flexGrow: 1,
    },
  }),
);

const NoScriptFallbackIcon = () => {
  return <div style={{ height: 48 }} />;
};

export const Home: React.FC<HomeProps> = ({
  ip,
  extraInfo,
  prefersDarkMode,
  toggleTheme,
}): JSX.Element => {
  const classes = useStyles();

  const renderTable = () => {
    if (isEmpty(extraInfo)) return null;

    return (
      <TableContainer
        style={{ boxShadow: '0 20px 70px rgba(0, 0, 0, 0.17)' }}
        component={Paper}
        className={classes.table}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Key</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(extraInfo)
              .filter(([k, _]) => k !== 'readme')
              .map(([k, v]) => {
                return (
                  <TableRow key={k}>
                    <TableCell component="th" scope="row">
                      {k}
                    </TableCell>
                    <TableCell align="right">
                      {k === 'loc' ? (
                        <a
                          href={`https://duckduckgo.com/?q=${encodeURIComponent(v)}&iaxm=maps`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={classes.locLink}
                        >
                          {`${v}`}
                          <CallMadeRoundedIcon className={classes.icon} />
                        </a>
                      ) : k === 'country' ? (
                        `${countryCodeEmoji(v)} ${v}`
                      ) : (
                        `${v}`
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <AppContainer className={classes.container}>
      <Head>
        <title>Crystal</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="network utilities for developers" />
      </Head>
      <header className={classes.header}>
        <div className={classes.grow} />
        <NoSsr fallback={<NoScriptFallbackIcon />}>
          <Tooltip title="Toggle Theme">
            <IconButton onClick={toggleTheme} aria-label="delete">
              {!prefersDarkMode ? <Brightness7RoundedIcon /> : <Brightness4RoundedIcon />}
            </IconButton>
          </Tooltip>
        </NoSsr>
      </header>
      <main>
        <h1 className={classes.title}>Welcome to Crystal.</h1>
        <h2 className={classes.subtitle}>{`Your IP: ${ip}`}</h2>
        {renderTable()}
      </main>

      <footer>
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
          Powered by <img src="/vercel.svg" alt="Vercel Logo" className={classes.logo} />
        </a>
      </footer>
    </AppContainer>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req }: { req: IncomingMessage } = context;
  const ip = req.headers['x-forwarded-for'];

  if (!ip) return { props: { ip: 'Failed to load :(', extraInfo: {} } };

  const res = await axios.get(`https://ipinfo.io/${ip}/json`);
  const extra = res.data || {};

  return {
    props: {
      ip: req.headers['x-forwarded-for'],
      extraInfo: extra,
    },
  };
};
