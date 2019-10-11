import React, { memo, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import uuidv4 from 'uuid/v4';

import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { FaPlus } from 'react-icons/fa';

import { actionsNames } from '../../utils/constans';

import { todoNormalize, localItemsNormalize } from '../../redux/normalize/todos';

const { ADD_ITEM, TODO_LIST } = actionsNames;


const useStyles = makeStyles((theme) => ({
  todoTbn: {
    marginTop: theme.spacing(1),
  },
  icon: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
  },
}));


const TodoViewAddItem = (props) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const currentTodo = useSelector((state) => state.todos.todosList[props.todoId]);

  const handleCreatTodoItem = useCallback(() => {
    const currentTodoItems = currentTodo && currentTodo.items ? currentTodo.items : [];
    const item = {
      title: 'UnTitlte content',
      status: false,
      tempId: uuidv4(),
    };
    dispatch({ type: ADD_ITEM, payload: localItemsNormalize(item).entities.item });
    const updateTodoAfterAddItem = { ...currentTodo, items: [item.tempId, ...currentTodoItems] };
    dispatch({ type: TODO_LIST, payload: todoNormalize(updateTodoAfterAddItem).entities.todo });
  }, [currentTodo, dispatch]);

  return (
    <div className={styles.todoTbn}>
      <Button color="primary" size="small" onClick={handleCreatTodoItem}>
        <FaPlus size={12} className={styles.icon} />
        Add Item
      </Button>
    </div>
  );
};


export default memo(TodoViewAddItem);
