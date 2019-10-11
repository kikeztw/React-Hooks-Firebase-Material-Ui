import React, { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { FaSync } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';

import firebase from '../../firebase';

import { colletionsNames, actionsNames, subColletionsNames } from '../../utils/constans';
import { cloudNotesNormalize } from '../../redux/normalize/notes';
import { uidSelector } from '../../redux/selectors';

import AsyncLoadingIcon from '../AsyncLoadingIcon';

const { SYNC_NOTES_FROM_DB } = actionsNames;
const { notes } = colletionsNames;
const { notesList } = subColletionsNames;

const notesDb = firebase.firestore().collection(notes);


const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.primary.main,
  },
}));

const NotesSyncWithDb = (props) => {
  const styles = useStyles();
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const uid = useSelector(uidSelector);


  const handleSync = useCallback(
    async () => {
      try {
        setLoading((state) => !state);
        const request = await notesDb.doc(uid).collection(notesList).get();
        if (!request.empty) {
          const data = request.docs.map((e) => ({
            id: e.id,
            ...e.data(),
          }));
          dispatch({ type: SYNC_NOTES_FROM_DB, payload: cloudNotesNormalize(data).entities.notes });
          console.log('notes sync with db success');
        }
        setTimeout(() => {
          setLoading((state) => !state);
        }, 500);
      } catch (error) {
        throw new Error(error);
      }
    }, [dispatch, uid],
  );

  return (
    <AsyncLoadingIcon isLoading={isLoading}>
      <IconButton onClick={handleSync}>
        <FaSync size={12} className={styles.icon} />
      </IconButton>
    </AsyncLoadingIcon>
  );
};


export default memo(NotesSyncWithDb);
