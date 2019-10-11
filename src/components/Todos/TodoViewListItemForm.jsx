/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { localItemsNormalize, localItemssWithIddNormalize } from '../../redux/normalize/todos';

import { actionsNames } from '../../utils/constans';

const { ADD_ITEM } = actionsNames;

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: 'inherit',
    flexGrow: 1,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 1),
    transition: theme.transitions.create('width'),
    width: '100%',
    fontWeight: 300,
    fontSize: 12,
  },
}));

const TodoViewListItemForm = (props) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const currentTodo = useSelector((state) => state.todos.todosItems[props.id]);

  const handleChange = useCallback((event) => {
    try {
      const { status } = props;
      const todo = currentTodo || {};
      const update = {
        ...todo,
        status,
        title: event.target.value,
      };

      const normalize = !update.id ? localItemsNormalize(update) : localItemssWithIddNormalize(update);
      dispatch({ type: ADD_ITEM, payload: normalize.entities.item });
    } catch (error) {
      throw new Error(error);
    }
  }, [currentTodo, dispatch, props]);


  const handleStatus = useCallback((event) => {
    try {
      const { title } = props;
      const todo = currentTodo || {};
      const update = {
        ...todo,
        status: event.target.checked,
        title,
      };
      const normalize = !update.id ? localItemsNormalize(update) : localItemssWithIddNormalize(update);
      dispatch({ type: ADD_ITEM, payload: normalize.entities.item });
    } catch (error) {
      throw new Error(error);
    }
  }, [currentTodo, dispatch, props]);


  const { title, status } = props;

  return (
    <>
      <Checkbox
        color="primary"
        checked={status}
        onChange={handleStatus}
        value="checkedA"
        inputProps={{
          'aria-label': 'primary checkbox',
        }}
      />
      <InputBase
        value={title}
        onChange={handleChange}
        classes={{
          root: styles.inputRoot,
          input: styles.inputInput,
        }}
      />
    </>
  );
};


export default memo(TodoViewListItemForm);
