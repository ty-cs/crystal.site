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
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DayIcon from '@material-ui/icons/WbSunnyRounded';
import NightsStayIcon from '@material-ui/icons/NightsStayRounded';
import AppContainer from '@/src/components/AppContainer';
import NoSsr from '@material-ui/core/NoSsr';
import { countryCodeEmoji } from '@/src/utils';

interface HomeProps {
  ip: string;
  extraInfo: IExtraInfo;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

type IExtraInfo = Record<string, unknown>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    '@global': {
      '#main-content': {
        outline: 0,
      },
      body: {
        transition: theme.transitions.create('background-color'),
      },
    },
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      '& main': {
        // width: '100%',
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
      lineHeight: '48px',
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    subtitle: {
      fontSize: '2.5rem',
      wordBreak: 'break-word',
      transition: theme.transitions.create('font-size'),

      // small: 600px
      [theme.breakpoints.up('sm')]: {
        fontSize: '3rem',
      },
    },
    logo: {
      height: '1rem',
      filter: theme.palette.type === 'dark' ? 'drop-shadow(0 0 4px white)' : 'unset',
    },
    table: {
      '& tbody tr:last-child': {
        '& th,td': {
          borderBottom: 'none',
        },
      },
      transition: theme.transitions.create(['min-width', 'background-color']),
      minWidth: 320 - 32, // iPhone SE gen1
      // small: 600px
      [theme.breakpoints.up('sm')]: {
        minWidth: 560,
      },
      boxShadow: '0 20px 70px rgba(0, 0, 0, 0.17)',
    },
    tableCell: {
      transition: theme.transitions.create(['border-color']),
    },
    locLink: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    header: {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
    },
    grow: {
      flexGrow: 1,
    },
    arrowRight: {
      width: 16,
      height: 16,

      marginLeft: 4,
      color: theme.palette.type === 'light' ? 'rgb(174,174,178)' : 'rgb(99,99,102)',
      transition: theme.transitions.create('color'),
    },
  }),
);

const NoScriptFallbackIcon = () => {
  return <div style={{ height: 48 }} />;
};

const ExtraInfoTable: React.FC<{ extraInfo: IExtraInfo }> = ({ extraInfo }) => {
  const classes = useStyles();

  if (isEmpty(extraInfo)) return null;

  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell}>Key</TableCell>
            <TableCell className={classes.tableCell} align="right">
              Value
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(extraInfo)
            .filter(([k, _]) => k !== 'readme')
            .map(([k, v]) => {
              return (
                <TableRow key={k}>
                  <TableCell className={classes.tableCell} component="th" scope="row">
                    {k}
                  </TableCell>
                  <TableCell className={classes.tableCell} align="right">
                    {k === 'loc' ? (
                      <a
                        href={`https://duckduckgo.com/?q=${encodeURIComponent(
                          v as string,
                        )}&iaxm=maps`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classes.locLink}
                      >
                        {`${v}`}
                        <ArrowForwardIosRoundedIcon className={classes.arrowRight} />
                      </a>
                    ) : k === 'country' ? (
                      `${countryCodeEmoji(v as string)} ${v}`
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
export const Home: React.FC<HomeProps> = ({
  ip,
  extraInfo,
  isDarkMode,
  toggleTheme,
}): JSX.Element => {
  const classes = useStyles();

  return (
    <AppContainer className={classes.container}>
      {/* todo: AppBar */}
      <header className={classes.header}>
        <span className={classes.title}>Crystal</span>
        <div className={classes.grow} />
        <NoSsr fallback={<NoScriptFallbackIcon />}>
          <Tooltip title="Toggle Theme">
            <IconButton onClick={toggleTheme} aria-label="delete">
              {!isDarkMode ? <DayIcon /> : <NightsStayIcon />}
            </IconButton>
          </Tooltip>
        </NoSsr>
      </header>
      <main>
        <h1 className={classes.subtitle}>Your IP: {ip}</h1>
        <ExtraInfoTable extraInfo={extraInfo} />
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

  const res = await axios.get<IExtraInfo>(`https://ipinfo.io/${ip}/json`);
  const extra = res.data || {};

  return {
    props: {
      ip: req.headers['x-forwarded-for'],
      extraInfo: extra,
    },
  };
};
