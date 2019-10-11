import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import {
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  activeBottom: {
    borderBottom: `2px solid ${theme.palette.primary.main}`,
  },
  activeVertical: {
    borderLeft: `2px solid ${theme.palette.primary.main}`,
  },
}));

export default withRouter(({
  location, className, to, children, borderType,
}) => {
  const styles = useStyles();
  const { pathname } = location;
  const style = borderType === 'vertical' ? styles.activeVertical : styles.activeBottom;
  return (
    <Link to={to} className={pathname === to ? `${className} ${style}` : `${className}`}>
      {children}
    </Link>
  );
});
