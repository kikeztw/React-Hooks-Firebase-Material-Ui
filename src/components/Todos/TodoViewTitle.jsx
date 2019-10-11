/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { actionsNames } from '../../utils/constans';
import { todoNormalize } from '../../redux/normalize/todos';

const {TODO_LIST  } = actionsNames;

const useStyles = makeStyles((theme) => ({
  input: {
    fontSize: 24,
    letterSpacing: 0.5,
    fontWeight: 300,
  },
  root: {
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));


const TodoViewTitle = (props) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.todos.todosList[props.todoId]);

  const handleChange = useCallback((event) => {
    const update = {
      ...todo,
      title: event.target.value,
    };
    dispatch({ type: TODO_LIST, payload: todoNormalize(update).entities.todo });
  }, [dispatch, todo]);


  const { title } = props;

  return (
    <div className={styles.root}>
      <InputBase
        className={styles.input}
        value={title}
        onChange={handleChange}
      />
    </div>
  );
};


export default memo(TodoViewTitle);
