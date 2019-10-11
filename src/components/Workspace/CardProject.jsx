/* eslint-disable arrow-body-style */
import React, { memo } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FaTasks } from 'react-icons/fa';


const useStyles = makeStyles((theme) => ({
  projectCard: {
    cursor: 'pointer',
    width: '100%',
    height: '100%',
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(4),
  },
  projectPicture: {
    height: '70%',
    borderRadius: 20,
    boxShadow: 'inset 0 -2px rgba(0,0,0,.05)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8384f',
  },
  title: {
    width: 100,
    margin: 'auto',
    paddingTop: theme.spacing(1),
    '& span': {
      display: 'flex',
    },
  },
}));

export default memo(() => {
  const styles = useStyles();

  return (
    <div className={styles.projectCard}>
      <div className={styles.projectPicture}>
        <FaTasks size={16} color="#fff" />
      </div>
      <div className={styles.title}>
        <Typography variant="caption" align="center">
          this is my project title
        </Typography>
      </div>
    </div>
  );
});
