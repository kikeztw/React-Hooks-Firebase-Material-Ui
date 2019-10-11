import React, { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Tooltip } from '@material-ui/core';
import { FaPlus } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';

import firebase from '../../firebase';

import { todoNormalize } from '../../redux/normalize/todos';
import { uidSelector } from '../../redux/selectors';

import { actionsNames, colletionsNames, subColletionsNames } from '../../utils/constans';

import AsyncLoadingIcon from '../AsyncLoadingIcon';


const { todos } = colletionsNames;
const { TODO_LIST } = actionsNames;
const { todoslistCN } = subColletionsNames;


const todosDb = firebase.firestore().collection(todos);
const timestamp = firebase.firestore.Timestamp;


const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.primary.main,
  },
}));

const TodoCreate = () => {
  const styles = useStyles();
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const uid = useSelector(uidSelector);

  const handleSubmit = useCallback(
    async () => {
      try {
        setLoading(true);
        const todo = {
          title: 'Untitled todo',
          metadata: {
            createAt: timestamp.fromDate(new Date()),
          },
          items: {},
        };
        // check If doc exist
        const isExistsDoc = await todosDb.doc(uid).get();
        if (!isExistsDoc.exists) {
          console.log('create notes doc cuz u dont have nothing jon snow');
          await todosDb.doc(uid).set({
            metadata: {
              createAt: timestamp.fromDate(new Date()),
            },
          });
        }

        const request = await todosDb.doc(uid).collection(todoslistCN).add(todo);
        const normalize = todoNormalize({ ...todo, id: request.id }).entities.todo;

        dispatch({ type: TODO_LIST, payload: normalize });
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        throw new Error(error);
      }
    }, [dispatch, uid],
  );

  return (
    <AsyncLoadingIcon isLoading={isLoading}>
      <Tooltip title="Add todo" placement="bottom">
        <IconButton aria-label="add-todo-form" onClick={handleSubmit}>
          <FaPlus size={12} className={styles.icon} />
        </IconButton>
      </Tooltip>
    </AsyncLoadingIcon>
  );
};


export default memo(TodoCreate);
