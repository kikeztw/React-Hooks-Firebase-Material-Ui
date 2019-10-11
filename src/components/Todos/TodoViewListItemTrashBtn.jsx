/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { memo, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FaTrash } from 'react-icons/fa';

import { todoNormalize } from '../../redux/normalize/todos';

import { actionsNames } from '../../utils/constans';

const { TODO_LIST, DELETE_ITEM } = actionsNames;


const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.secondary.dark,
  },
}));

const TodoViewListItemTrashBtn = (props) => {
  const { match } = props;
  const styles = useStyles();
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.todos.todosList[match.params.id]);
  const items = useSelector((state) => state.todos.todosItems);

  const handleDelete = useCallback(() => {
    const { ItemId } = props;
    const todoIds = todo && todo.items ? todo.items : [];

    if (items[ItemId]) delete items[ItemId];
    const updateTodoAfterDeleteItem = { ...todo, items: todoIds.filter((e) => e !== ItemId) };

    dispatch({ type: DELETE_ITEM, payload: items });
    dispatch({ type: TODO_LIST, payload: todoNormalize(updateTodoAfterDeleteItem).entities.todo });
  }, [dispatch, items, props, todo]);

  return (
    <IconButton onClick={handleDelete}>
      <FaTrash size={12} className={styles.icon} />
    </IconButton>
  );
};


export default withRouter(memo(TodoViewListItemTrashBtn));
