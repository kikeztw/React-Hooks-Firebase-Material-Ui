import React, { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Tooltip } from '@material-ui/core';
import { FaSync } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';

import firebase from '../../firebase';

import { syncTodoNormalize } from '../../redux/normalize/todos';
import { uidSelector } from '../../redux/selectors';

import { actionsNames, colletionsNames, subColletionsNames } from '../../utils/constans';

import AsyncLoadingIcon from '../AsyncLoadingIcon';

const { todos } = colletionsNames;
const { todoslistCN } = subColletionsNames;
const { TODO_LIST, ADD_ITEM } = actionsNames;

const todosDb = firebase.firestore().collection(todos);


const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.primary.main,
  },
}));


const TodoSyncWithDb = (props) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const uid = useSelector(uidSelector);

  const syncCloudTodos = useCallback(async () => {
    try {
      setLoading(true);

      const request = await todosDb.doc(uid).collection(todoslistCN).get();
      const data = request.docs.map((e) => ({ id: e.id, ...e.data() }));
      const normalize = syncTodoNormalize(data).entities;

      dispatch({ type: TODO_LIST, payload: normalize.todo });
      dispatch({ type: ADD_ITEM, payload: normalize.items });

      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      throw new Error(error);
    }
  }, [dispatch, uid]);

  return (
    <AsyncLoadingIcon isLoading={isLoading}>
      <Tooltip title="Sync todos" placement="bottom">
        <IconButton aria-label="add-todo-form" onClick={syncCloudTodos}>
          <FaSync size={12} className={styles.icon} />
        </IconButton>
      </Tooltip>
    </AsyncLoadingIcon>

  );
};


export default memo(TodoSyncWithDb);
