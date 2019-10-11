/* eslint-disable react/prop-types */
import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import firebase from '../../firebase';

import { uidSelector } from '../../redux/selectors';

import { actionsNames, colletionsNames, subColletionsNames } from '../../utils/constans';

import Link from '../Link';
import TodoListItemActions from './TodoListItemActions';

const { todos } = colletionsNames;
const { DELETE_TODO, DELETE_ITEM } = actionsNames;
const { todoslistCN } = subColletionsNames;

const todosDb = firebase.firestore().collection(todos);

const useStyles = makeStyles({
  root: {
    paddingLeft: 0,
  },
  listItemSecondary: {
    right: 0,
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    display: 'block',
    width: '100%',
    padding: '2.5px 0 2.5px 24px',
    minHeight: 33,
  },
});


const TodoListItem = (props) => {
  const { id, itemsId, title } = props;
  const styles = useStyles();
  const dispatch = useDispatch();
  const uid = useSelector(uidSelector);
  const todoList = useSelector((state) => state.todos.todosList);
  const todoItems = useSelector((state) => state.todos.todosItems);


  const handleDelete = useCallback(async () => {
    try {
      const updateTodoList = {
        ...todoList,
      };

      const updateItemsList = {
        ...todoItems,
      };

      itemsId.forEach((e) => {
        if (updateItemsList[e]) delete updateItemsList[e];
      });

      if (updateTodoList[id]) delete updateTodoList[id];

      await todosDb.doc(uid).collection(todoslistCN).doc(id).delete();

      dispatch({ type: DELETE_TODO, payload: updateTodoList });
      dispatch({ type: DELETE_ITEM, payload: updateItemsList });
    } catch (error) {
      throw new Error(error);
    }
  }, [dispatch, id, itemsId, todoItems, todoList, uid]);

  return (
    <ListItem className={styles.root}>
      <Link
        to={`/todos/${id}`}
        className={styles.link}
        borderType="vertical"
      >
        <ListItemText primary={title} />
      </Link>
      <ListItemSecondaryAction className={styles.listItemSecondary}>
        <TodoListItemActions onDelete={handleDelete} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default memo(TodoListItem);
