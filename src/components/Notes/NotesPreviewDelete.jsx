import React, { memo, useState, useCallback } from 'react';
import { Grid, IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { FaTrash } from 'react-icons/fa';

import firebase from '../../firebase';

import { uidSelector } from '../../redux/selectors';

import { colletionsNames, actionsNames, subColletionsNames } from '../../utils/constans';

import AsyncLoadingIcon from '../AsyncLoadingIcon';


const { notes } = colletionsNames;
const { notesList } = subColletionsNames;
const { REMOVE_NOTE } = actionsNames;

const notesDb = firebase.firestore().collection(notes);

const useStyles = makeStyles((theme) => ({
  trashContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 12,
    cursor: 'pointer',
  },
}));

const NotesPreviewDelete = (props) => {
  const styles = useStyles();
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const notesListState = useSelector((state) => state.notes.notesList);
  const uid = useSelector(uidSelector);


  const onDelete = useCallback(
    async () => {
      try {
        setLoading((state) => !state);
        const { id } = props;
        const copyNotesList = { ...notesListState };

        if (!copyNotesList[id].tempId) {
          await notesDb.doc(uid).collection(notesList).doc(id).delete();
        }

        if (copyNotesList[id]) delete copyNotesList[id];

        dispatch({ type: REMOVE_NOTE, payload: copyNotesList });
      } catch (error) {
        throw new Error(error);
      }
    }, [dispatch, notesListState, props, uid],
  );

  return (
    <div className={styles.trashContainer}>
      <Grid container direction="row" justify="flex-end">
        <AsyncLoadingIcon isLoading={isLoading}>
          <IconButton onClick={onDelete}>
            <FaTrash size={14} />
          </IconButton>
        </AsyncLoadingIcon>
      </Grid>
    </div>
  );
};

export default memo(NotesPreviewDelete);
