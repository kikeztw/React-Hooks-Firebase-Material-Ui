/* eslint-disable no-shadow */
/* eslint-disable comma-dangle */
/* eslint-disable react/prop-types */
import React, { memo } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import TodoViewSaveInDbBtn from './TodoViewSaveInDbBtn';

const useStyles = makeStyles({
  warnMessage: {
    color: '#d50000',
  },
});


const TodoViewHeader = (props) => {
  const { id, isTodoNeedSave } = props;
  const styles = useStyles();

  return (
    <div>
      <TodoViewSaveInDbBtn todoId={id} />
      {
      isTodoNeedSave && (
        <Typography variant="caption" className={styles.warnMessage}>
          Warning: Your todo items is no save in Database yet
        </Typography>
      )
    }
    </div>
  );
};

export default memo(TodoViewHeader);
