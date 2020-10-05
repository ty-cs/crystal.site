import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      paddingTop: 16,
      [theme.breakpoints.up('lg')]: {
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),
      },
    },
  }),
);

interface AppContainerProps {
  className: string;
  children: NonNullable<React.ReactNode>;
}

const AppContainer: React.FC<AppContainerProps> = (props) => {
  const { className, ...other } = props;
  const classes = useStyles();

  return (
    <Container
      component="div"
      id="main-content"
      maxWidth="md"
      tabIndex={-1}
      className={clsx(classes.root, className)}
      {...other}
    />
  );
};

export default AppContainer;
