/* eslint-disable react/prop-types */
import React, { memo } from 'react';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    padding: 12,
  },
});

export default memo(({ isLoading, children, size }) => {
  const styles = useStyles();
  if (isLoading) {
    return (
      <div className={styles.root}>
        <CircularProgress size={size || 14} />
      </div>
    );
  }

  return children;
});
