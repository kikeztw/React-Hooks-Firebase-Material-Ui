/* eslint-disable react/prop-types */
import React, { memo, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


import firebase from '../../firebase';

import { actionsNames } from '../../utils/constans';

const { AUTH } = actionsNames;

const useStyle = makeStyles({
  icon: {
    width: 24,
    height: 24,
  },
  iconWrapper: {
    margin: '0 15px',
    display: 'flex',
  },
  button: {
    width: '100%',
    border: '1px solid #e4e4e4',
    ' & .MuiButton-label& ': {
      display: 'flex',
      alignItems: 'center',
    },
  },
});


const SigninWithFacebook = (props) => {
  const dispatch = useDispatch();
  const styles = useStyle();


  const signinWithFacebook = useCallback(
    async (cb) => {
      try {
        const { history } = props;
        const facebookProvider = new firebase.auth.FacebookAuthProvider();
        const request = await firebase.auth().signInWithPopup(facebookProvider);
        if (request.credential && request.user && request.additionalUserInfo) {
          const data = {
            uid: request.user.uid,
            isNewUser: request.additionalUserInfo.isNewUser,
            authProfile: request.additionalUserInfo.profile,
          };
          dispatch({ type: AUTH, payload: data });
          history.push('/');
        }
      } catch (error) {
        throw new Error(error);
      }
    }, [dispatch, props],
  );

  return (
    <Button onClick={signinWithFacebook} className={styles.button}>
      <div className={styles.iconWrapper}>
        <img src={require('../../assets/images/facebook.png')} alt="google" className={styles.icon} />
      </div>
      <Typography variant="caption">
        Sign in with Google
      </Typography>
    </Button>
  );
};


export default withRouter(memo(SigninWithFacebook));
