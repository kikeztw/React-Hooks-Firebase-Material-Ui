import React, { memo, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  InputBase,
  Button,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FaPlusCircle } from 'react-icons/fa';
import uuidv4 from 'uuid/v4';


import firebase from '../../firebase';

import { localNoteNormalize } from '../../redux/normalize/notes';
import { actionsNames } from '../../utils/constans';

const { NOTE_LIST } = actionsNames;


const useStyles = makeStyles((theme) => ({
  iconBtn: {
    color: theme.palette.common.white,
    marginRight: theme.spacing(1),
  },
  btnadd: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  btnMargin: {
    marginRight: theme.spacing(1),
  },
}));

const CreateNote = (props) => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const [values, setValues] = useState({
    title: '',
    content: '',
  });

  const handleCancel = useCallback(() => {
    const { onClose } = props;
    onClose();
  }, [props]);

  const handleSubmit = useCallback(
    async () => {
      try {
        const { onClose } = props;
        const data = {
          metadata: {
            createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
          },
          ...values,
          tempId: uuidv4(),
        };
        dispatch({ type: NOTE_LIST, payload: localNoteNormalize(data).entities.notes });
        onClose();
      } catch (error) {
        throw new Error(error);
      }
    }, [dispatch, props, values],
  );

  const onChange = (fieldName) => (event) => {
    setValues({ ...values, [fieldName]: event.target.value });
  };

  return (
    <form autoComplete="off">
      <InputBase
        onChange={onChange('title')}
        name="title"
        placeholder="Title"
        fullWidth
        id="title"
        margin="dense"
        value={values.title}
      />
      <InputBase
        value={values.content}
        onChange={onChange('content')}
        className={styles.textField}
        name="content"
        fullWidth
        id="content-note"
        multiline
        rows="5"
        placeholder="Content"
        margin="dense"
      />
      <div>
        <Grid container direction="row" justify="flex-end">
          <Button
            onClick={handleCancel}
            size="small"
            className={`${styles.btnadd} ${styles.btnMargin}`}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            size="small"
            variant="contained"
            className={styles.btnadd}
          >
            <FaPlusCircle size={16} className={styles.iconBtn} />
            Add note
          </Button>
        </Grid>
      </div>
    </form>
  );
};


export default memo(CreateNote);
