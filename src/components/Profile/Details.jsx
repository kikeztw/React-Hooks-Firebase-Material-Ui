/* eslint-disable arrow-body-style */
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    background: theme.palette.secondary.light,
    borderRadius: 5,
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.secondary.dark}`,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarWrapper: {
    marginBottom: theme.spacing(3),
    width: 128,
    height: 128,
    marginLeft: 'auto',
  },
}));

const DetailsProfile = () => {
  const styles = useStyles();
  const firstName = useSelector((state) => state.profile.firstName);
  const picture = useSelector((state) => state.profile.picture);
  const lastName = useSelector((state) => state.profile.lastName);


  return (
    <Grid container direction="row">
      <Grid item lg={6}>
        <Typography variant="h4">
          {`${firstName} ${lastName}`}
        </Typography>
      </Grid>
      <Grid item lg={6}>
        <div className={styles.avatarWrapper}>
          <img src={picture} alt="profilePicutre" className={styles.avatar} />
        </div>
      </Grid>
    </Grid>
  );
};


export default memo(DetailsProfile);
