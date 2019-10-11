/* eslint-disable react/prop-types */
import React, { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputBase, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FaPlusCircle } from 'react-icons/fa';

import firebase from '../../firebase';

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

const EditNote = (props) => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const todo = useSelector((state) => state.notes.notesList[props.id]);
  const [values, setValues] = useState({
    title: todo ? todo.title : '',
    content: todo ? todo.content : '',
  });
  const handleCancel = useCallback(() => {
    const { onClose } = props;
    if (onClose) {
      onClose();
    }
  }, [props]);

  const onChange = (fieldName) => (event) => {
    setValues({ ...values, [fieldName]: event.target.value });
  };

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const { onClose, id } = props;
    const data = {
      id,
      ...values,
      metadata: {
        ...todo.metadata,
        updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
      },
    };
    dispatch({ type: NOTE_LIST, payload: { [id]: { ...data } } });
    onClose();
  }, [dispatch, props, todo.metadata, values]);


  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <InputBase
        onChange={onChange('title')}
        value={values.title}
        name="title"
        placeholder="Title"
        fullWidth
        id="title"
        margin="dense"
      />
      <InputBase
        onChange={onChange('content')}
        value={values.content}
        className={styles.textField}
        name="content"
        fullWidth
        id="content-note"
        multiline
        rows="6"
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
          <Button color="primary" size="small" variant="contained" className={styles.btnadd} type="submit">
            <FaPlusCircle size={16} className={styles.iconBtn} />
            Save changes
          </Button>
        </Grid>
      </div>
    </form>
  );
};


export default memo(EditNote);
