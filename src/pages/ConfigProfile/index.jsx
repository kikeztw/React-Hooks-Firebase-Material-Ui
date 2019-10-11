/* eslint-disable react/prop-types */
import React, { memo, useState, useCallback } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import firebase from '../../firebase';

import { colletionsNames } from '../../utils/constans';

import { uidSelector } from '../../redux/selectors';

const { profile } = colletionsNames;

const userDb = firebase.firestore().collection(profile);

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(13),
  },
  avatarWrapper: {
    width: 125,
    height: 125,
    marginBottom: theme.spacing(5),
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  subTitle: {
    margin: theme.spacing(3),
  },
  btnWrapper: {
    marginTop: theme.spacing(3),
  },
}));


const Config = (props) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const authProfile = useSelector((state) => state.auth.authProfile);
  const uid = useSelector(uidSelector);
  const profileState = useSelector((state) => state.profile);

  const [values, setValues] = useState({
    firstName: Object.values(authProfile).length && authProfile.given_name ? authProfile.given_name : '',
    lastName: Object.values(authProfile).length && authProfile.family_name ? authProfile.family_name : '',
    picture: Object.values(authProfile).length && authProfile.picture ? authProfile.picture : '',
    userName: null,
  });

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        setLoading(true);
        const { history } = props;
        const { userName } = values;
        const request = await userDb.where('userName', '==', userName).get();
        if (!request.empty) {
          setError((state) => !state);
          setLoading((state) => !state);
          return;
        }
        await userDb.doc(uid).set({ isProfileComplete: true, ...values });
        dispatch({ type: 'SWITCH_IS_NEW_STATUS', payload: false });
        dispatch({ type: 'ADD_PROFILE', payload: { isProfileComplete: true, ...values } });
        history.push('/');
      } catch (error) {
        throw new Error(error);
      }
    }, [dispatch, props, uid, values],
  );


  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };


  if (profileState && profileState.isProfileComplete) {
    return (
      <Redirect to="/" />
    );
  }


  return (
    <div className={styles.root}>
      <Container maxWidth="sm">
        <Grid container justify="center" alignItems="center">
          <div className={styles.avatarWrapper}>
            <img src={values.picture} alt="configProfile" className={styles.avatar} />
          </div>
        </Grid>
        <Grid container direction="row" justify="center">
          <div className={styles.subTitle}>
            <Typography variant="overline" component="span">Do you want to save this data as your profile information?</Typography>
          </div>
        </Grid>
        <form autoComplete="off" onSubmit={onSubmit}>
          <TextField
            FormHelperTextProps={{ style: { color: 'red' } }}
            helperText={isError && 'Invalid username'}
            error={!values.userName}
            required
            InputProps={{
              placeholder: 'Choise a user Name',
              autoFocus: true,
            }}
            fullWidth
            id="userName"
            label="User Name"
            margin="normal"
            onChange={handleChange('userName')}
          />
          <TextField
            value={values.firstName}
            fullWidth
            id="firstName"
            label="FirstName"
            margin="normal"
            onChange={handleChange('firstName')}
          />
          <TextField
            value={values.lastName}
            fullWidth
            id="lastName"
            label="LastName"
            margin="normal"
            onChange={handleChange('lastName')}
          />
          <TextField
            InputProps={{
              placeholder: 'do you want add some description? :)',
            }}
            rows={3}
            multiline
            fullWidth
            id="description"
            label="Description"
            margin="normal"
            onChange={handleChange('description')}
          />
          <div className={styles.btnWrapper}>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              fullWidth
              color="primary"
            >
              {isLoading && <CircularProgress size={16} />}
                Next
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};


export default withRouter(memo(Config));
