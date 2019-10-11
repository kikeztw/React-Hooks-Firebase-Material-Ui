/* eslint-disable arrow-body-style */
import React from 'react';
import { Container, Grow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBarSecondary from '../../components/AppBarSecondary';
import { DetailsProfile, Form } from '../../components/Profile';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    // backgroundColor: theme.palette.secondary.main,
  },
  main: {
    paddingTop: theme.spacing(15),
  },
}));

const Profile = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <AppBarSecondary title="Profile" />
      <Grow in timeout={450}>
        <main className={styles.main}>
          <Container maxWidth="sm">
            <DetailsProfile />
            <Form />
          </Container>
        </main>
      </Grow>
    </div>
  );
};

export default Profile;
