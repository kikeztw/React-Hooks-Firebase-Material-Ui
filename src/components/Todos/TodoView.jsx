/* eslint-disable no-shadow */
/* eslint-disable comma-dangle */
/* eslint-disable react/prop-types */
import React, {
  memo,
} from 'react';
import {
  Typography,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import TodoViewHeader from './TodoViewHeader';
import TodoViewList from './TodoViewList';
import TodoViewAddItem from './TodoViewAddItem';
import TodoViewTitle from './TodoViewTitle';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
  },
  body: {
    padding: `0 ${theme.spacing(2) - 3}px`,
  },
  title: {
    fontWeight: 300,
  },
}));


const TodoView = (props) => {
  const { match } = props;
  const { params: { id } } = match;
  const styles = useStyles();
  const todosList = useSelector((state) => state.todos.todosList);
  // current Todo

  const currentTodo = todosList[id];

  if (!currentTodo) {
    return (
      <div className={styles.root}>
        <Typography variant="h6" className={styles.title}>
          Todo no found
        </Typography>
      </div>
    );
  }

  const { title, items } = currentTodo;

  return (
    <div className={styles.root}>
      <TodoViewHeader id={id} isTodoNeedSave={false} />
      <div className={styles.body}>
        <TodoViewTitle title={title} todoId={id} />
        <TodoViewAddItem todoId={id} />
        <TodoViewList itemsIds={items} />
      </div>
    </div>
  );
};


export default memo(TodoView);
