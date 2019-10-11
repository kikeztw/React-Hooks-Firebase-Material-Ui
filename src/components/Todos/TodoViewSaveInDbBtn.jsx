/* eslint-disable react/prop-types */
import React, { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { FaSave } from 'react-icons/fa';

import firebase from '../../firebase';

import { todoNormalize } from '../../redux/normalize/todos';
import { uidSelector } from '../../redux/selectors';

import {
  actionsNames,
  subColletionsNames,
  colletionsNames,
} from '../../utils/constans';

import AsyncLoadingIcon from '../AsyncLoadingIcon';
// import { makeStyles } from '@material-ui/core/styles';

const { todos } = colletionsNames;
const { todoslistCN } = subColletionsNames;
const { TODO_LIST, ADD_ITEM } = actionsNames;

const todosDb = firebase.firestore().collection(todos);
const timestamp = firebase.firestore.Timestamp;


const TodoViewSaveInDbBtn = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const localtodos = useSelector((state) => state.todos.todosList);
  const localitems = useSelector((state) => state.todos.todosItems);
  const uid = useSelector(uidSelector);


  const handleSaveTodo = useCallback(
    async () => {
      try {
        setLoading(true);
        const { todoId } = props;

        // get select todo data from redux
        const selectTodo = localtodos && localtodos[todoId] ? { ...localtodos[todoId] } : {};
        let selecItems = {};

        // check if todos list is not empty
        if (!Object.values(selectTodo).length) return;

        if (selectTodo && selectTodo.items && selectTodo.items.length) {
          selectTodo.items.forEach((element) => {
            if (localitems[element]) {
              selecItems = {
                ...selecItems,
                [element]: {
                  ...localitems[element],
                  id: element,
                },
              };
            }
            if (selecItems[element].tempId) delete selecItems[element].tempId;
          });
          selectTodo.items = selecItems;
          selectTodo.metadata.updateAt = timestamp.fromDate(new Date());
        }

        if (selectTodo.id) delete selectTodo.id;
        await todosDb.doc(uid).collection(todoslistCN).doc(todoId).update(selectTodo);
        const normalize = todoNormalize({ ...selectTodo, id: todoId }).entities;
        dispatch({ type: TODO_LIST, payload: normalize.todo });
        dispatch({ type: ADD_ITEM, payload: normalize.items });


        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        throw new Error(error);
      }
    }, [dispatch, localitems, localtodos, props, uid],
  );

  return (
    <AsyncLoadingIcon isLoading={isLoading}>
      <IconButton onClick={handleSaveTodo}>
        <FaSave size={14} color="#000" />
      </IconButton>
    </AsyncLoadingIcon>
  );
};

export default memo(TodoViewSaveInDbBtn);
