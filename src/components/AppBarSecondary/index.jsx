import React, { useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import NavBarProfile from '../NavBarProfile';

const useStyles = makeStyles((theme) => ({
  grow: {
    position: 'relative',
    width: '100%',
    '& header': {
      '& div': {
        justifyContent: 'space-between',
        boxShadow: 'none',
      },
    },
  },
  appBar: {
    boxShadow: 'none',
  },
  ul: {
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    '& li': {
      listStyle: 'none',
    },
  },
  title: {
    fontWeight: 300,
  },
}));

function AppBarComponent({ history, title }) {
  const styles = useStyles();
  const onBack = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <div className={styles.grow}>
      <AppBar position="relative" className={styles.appBar} color="secondary">
        <Toolbar>
          <ul className={styles.ul}>
            <li>
              <IconButton aria-label="arrow-back" onClick={onBack}>
                <ArrowBackIcon />
              </IconButton>
            </li>
            <li>
              <Typography variant="h6" className={styles.title}>
                {title}
              </Typography>
            </li>
          </ul>
          <NavBarProfile />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(AppBarComponent);
