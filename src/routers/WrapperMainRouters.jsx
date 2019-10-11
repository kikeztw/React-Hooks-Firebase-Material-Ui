/* eslint-disable import/no-extraneous-dependencies */
import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const MainRouters = lazy(() => import('./MainRouters'));
const ConfigProfile = lazy(() => import('../pages/ConfigProfile'));
const Profile = lazy(() => import('../pages/Profile'));

function MainApp({ match }) {
  const { path } = match;
  return (
    <Switch>
      <Route exact path={`${path}profile`} component={Profile} />
      <Route exact path={`${path}profile/config`} component={ConfigProfile} />
      <Route path={`${path}`} component={MainRouters} />
    </Switch>
  );
}


export default MainApp;
