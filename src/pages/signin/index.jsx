import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import {
  Container,
  Grid,
  Link as MaterialLink,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { uidSelector } from '../../redux/selectors';

import {
  SignInWithGoogle,
  SignInWithFacebook,
  SingInHeaderItem,
} from '../../components/Auth';

const useStyle = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(18),
  },
  footer: {
    marginTop: theme.spacing(3),
  },
  subTitle: {
    marginTop: 35,
    marginBottom: 20,
  },
  item: {
    marginTop: theme.spacing(2),
  },
  itemRoot: {
    marginTop: theme.spacing(3),
  },
  titleWrapper: {
    marginBottom: theme.spacing(4),
  },
  title: {
    color: '#656565',
  },
  about: {
    textAlign: 'center',
    color: '#006dff',
    display: 'block',
    padding: theme.spacing(2),
    cursor: 'pointer',
  },
}));


const Signin = () => {
  const styles = useStyle();
  const profile = useSelector((state) => state.profile);
  const uid = useSelector(uidSelector);

  if (profile && uid.length) {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.root}>
      <Container maxWidth="xs">
        <div className={styles.titleWrapper}>
          <Typography variant="h3" component="div" align="center" className={styles.title}>
            Kanban Todo
          </Typography>
        </div>
        <Grid container justify="space-between">
          <SingInHeaderItem img="react.png" />
          <SingInHeaderItem img="firebase.png" />
          <SingInHeaderItem img="material-ui.png" />
        </Grid>
        <Grid container direction="column" className={styles.itemRoot}>
          <div className={styles.item}>
            <SignInWithGoogle />
          </div>
          <div className={styles.item}>
            <SignInWithFacebook />
          </div>
        </Grid>
        <Grid container>
          <Grid item xs>
            <MaterialLink to="" variant="body2" className={styles.about}>
                About the project
            </MaterialLink>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};


export default Signin;
