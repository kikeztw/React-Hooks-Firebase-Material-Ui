/* eslint-disable arrow-body-style */
/* eslint-disable padded-blocks */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';


import { PrimaryNavBar, SecondaryNavBar } from '../components/AppNavBar';

import Todos from '../pages/Todos';
import Notes from '../pages/Notes';

const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    height: '100%',
    overflow: 'auto',
    paddingTop: 104,
    boxSizing: 'border-box',
    // backgroundColor: theme.palette.secondary.light,
  },
  wrapperRouter: {
    height: '100%',
  },
  navBarWrapper: {
    position: 'fixed',
    width: '100%',
    zIndex: 200,
    boxShadow: '0 4px 2px -2px rgba(171, 171, 171, 0.1)',
  },
}));

const MainRouters = ({ match, history }) => {
  const styles = useStyles();
  const isNewUser = useSelector((state) => state.auth.isNewUser);
  const profile = useSelector((state) => state.profile);
  const { path } = match;

  useEffect(() => {
    const { url } = match;
    if (url === '/') {
      history.push('/todos');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  if (isNewUser || (profile && profile.isProfileComplete === false)) {
    return <Redirect to="/profile/config" />;
  }

  return (
    <>
      <div className={styles.navBarWrapper}>
        <PrimaryNavBar />
        <SecondaryNavBar />
      </div>
      <main className={styles.main}>
        <div className={styles.wrapperRouter}>
          <Switch>
            <Route path={`${path}todos`} component={Todos} />
            <Route path={`${path}notes`} component={Notes} />
          </Switch>
        </div>
      </main>
    </>
  );
};


export default MainRouters;
