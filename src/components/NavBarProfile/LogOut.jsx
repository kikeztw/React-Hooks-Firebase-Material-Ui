import React, { useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MenuItem } from '@material-ui/core';

import firebase from '../../firebase';

function LogOut(props) {
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    try {
      const { history } = props;
      firebase.auth().signOut();
      dispatch({ type: 'USER_LOGOUT' });
      history.push('/');
    } catch (error) {
      throw new Error(error);
    }
  }, [dispatch, props]);

  return <MenuItem onClick={logOut}>Log Out</MenuItem>;
}


export default withRouter(LogOut);
