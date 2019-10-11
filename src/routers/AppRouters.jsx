/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
import React, {
  lazy, Suspense, useState, useEffect,
} from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

import firebase from '../firebase';


const Signin = lazy(() => import('../pages/signin'));
const Signup = lazy(() => import('../pages/signup'));
const WrapperMainRouter = lazy(() => import('./WrapperMainRouters'));

const profileDb = firebase.firestore().collection('profiles');

const App = (props) => {
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUserProfileConfig = () => {
      const { history } = props;
      firebase.auth().onIdTokenChanged(async (user) => {
        try {
          if (user) {
            const { uid } = user;
            const response = await profileDb.doc(uid).get();
            if (response.exists) {
              const data = { ...response.data() };
              dispatch({ type: 'ADD_PROFILE', payload: data });
            }
          } else {
            history.push('/signin');
          }
          setLoading(false);
        } catch (error) {
          throw new Error(error);
        }
      });
    };
    checkUserProfileConfig();
  }, []);

  if (isLoading) {
    return (
      <div className="h-100 justify-content-center align-items-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/signin" component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/" component={WrapperMainRouter} />
      </Switch>
    </Suspense>
  );
};


export default withRouter(App);
