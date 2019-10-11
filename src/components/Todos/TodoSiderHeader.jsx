import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TodoCreate from './TodoCreate';
import TodoSyncWithDb from './TodoSyncWithDb';


const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
  },
});

const TodoSiderHeaderActions = () => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <TodoSyncWithDb />
      <TodoCreate />
    </div>
  );
};

export default memo(TodoSiderHeaderActions);
