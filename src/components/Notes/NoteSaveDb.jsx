import React, { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';

import firebase from '../../firebase';

import { uidSelector } from '../../redux/selectors';
import { cloudNotesNormalize } from '../../redux/normalize/notes';
import {
  colletionsNames,
  subColletionsNames,
  actionsNames,
} from '../../utils/constans';

import AsyncLoadingIcon from '../AsyncLoadingIcon';

const { notes } = colletionsNames;
const { notesList } = subColletionsNames;
const { STORE_NOTES_FROM_DB } = actionsNames;

const notesDb = firebase.firestore().collection(notes);
const timestamp = firebase.firestore.Timestamp;

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.primary.main,
  },
}));

// eslint-disable-next-line arrow-body-style
const NoteSaveDb = (props) => {
  const styles = useStyles();
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const notesListToArray = useSelector((state) => state.notes.notesList);
  const uid = useSelector(uidSelector);

  const checkNotesDoc = useCallback(async () => {
    try {
      const isExistsDoc = await notesDb.doc(uid).get();
      if (!isExistsDoc.exists) {
        console.log('create notes doc cuz u dont have nothing jon snow');
        await notesDb.doc(uid).set({
          metadata: {
            createAt: timestamp.fromDate(new Date()),
          },
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  }, [uid]);


  const addNewElement = useCallback(async () => {
    try {
      const notesListWithTempId = Object.values(notesListToArray).filter((e) => e.tempId);

      notesListWithTempId.forEach((e) => {
        if (e.tempId) {
          delete e.tempId;
        }
      });

      if (notesListWithTempId.length) {
        console.log('element with tempId saving');
        await Promise.all(
          notesListWithTempId
            .map((element) => notesDb
              .doc(uid)
              .collection(notesList)
              .add(element)),
        );
      }
    } catch (error) {
      throw new Error(error);
    }
  }, [notesListToArray, uid]);


  const updateDoc = useCallback(async () => {
    try {
      const notesLIstWithId = Object.values(notesListToArray).filter((e) => e.id);

      if (notesLIstWithId.length) {
        console.log('element with id updating');
        await Promise.all(
          notesLIstWithId.map((element) => {
            const { id } = element;
            const elementCopy = { ...element };
            if (elementCopy.id) delete elementCopy.id;
            return notesDb
              .doc(uid)
              .collection(notesList)
              .doc(id)
              .update(elementCopy);
          }),
        );
      }
    } catch (error) {
      throw new Error(error);
    }
  }, [notesListToArray, uid]);


  const handleSave = useCallback(
    async () => {
      setLoading((state) => !state);
      await checkNotesDoc();
      await addNewElement();
      await updateDoc();

      const getDoc = await notesDb.doc(uid).collection(notesList).get();
      const responseData = getDoc.docs.map((e) => ({
        id: e.id,
        ...e.data(),
      }));

      dispatch({
        type: STORE_NOTES_FROM_DB,
        payload: cloudNotesNormalize(responseData).entities.notes,
      });
      setLoading((state) => !state);
    }, [addNewElement, checkNotesDoc, dispatch, uid, updateDoc],
  );


  return (
    <AsyncLoadingIcon isLoading={isLoading}>
      <IconButton onClick={handleSave}>
        <FaCloudUploadAlt size={14} className={styles.icon} />
      </IconButton>
    </AsyncLoadingIcon>
  );
};

export default memo(NoteSaveDb);
