import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import Link from '../Link';


const useStyles = makeStyles((theme) => ({
  bar: {
    boxShadow: 'none',
  },
  toolbar: {
    alignItems: 'center',
    minHeight: 40,
    height: 40,
  },
  ul: {
    padding: 0,
    margin: 0,
    display: 'flex',
    backgroundColor: theme.palette.secondary.main,
    height: '100%',
  },
  li: {
    marginRight: theme.spacing(3),
    display: 'flex',
    '& a': {
      textDecoration: 'none',
      color: theme.palette.secondary.contrastText,
    },
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 5px',
    '&:nth-child(1)': {
      paddingRight: 5,
      paddingLeft: 0,
    },
  },
}));

export default withRouter(({ match }) => {
  const styles = useStyles();
  const { url } = match;
  return (
    <AppBar position="relative" className={styles.bar} color="secondary">
      <Toolbar variant="dense" className={styles.toolbar}>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link to={`${url}todos`} className={styles.link}>
              <Typography variant="caption">
                Todo List
              </Typography>
            </Link>
          </li>
          <li className={styles.li}>
            <Link to={`${url}notes`} className={styles.link}>
              <Typography variant="caption">
                Notes
              </Typography>
            </Link>
          </li>
        </ul>
      </Toolbar>
    </AppBar>
  );
});
