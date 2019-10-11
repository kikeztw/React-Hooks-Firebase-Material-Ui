import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { FaSearch } from 'react-icons/fa';


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
  title: {
    color: theme.palette.primary.main,
  },
}));

export default function AppBarComponent() {
  const classes = useStyles();


  return (
    <div className={classes.grow}>
      <AppBar position="relative" className={classes.appBar} color="secondary">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            Kanban app
          </Typography>
          <NavBarProfile />
        </Toolbar>
      </AppBar>
    </div>
  );
}
