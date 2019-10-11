/* eslint-disable react/self-closing-comp */
/* eslint-disable arrow-body-style */
import React, { memo, useState, useCallback } from 'react';
import {
  InputBase,
  Dialog,
  DialogContent,
  InputAdornment,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FaPlusCircle } from 'react-icons/fa';
import CreateNote from './CreateNote';

const useStyles = makeStyles((theme) => ({
  iconAdd: {
    color: theme.palette.primary.main,
  },
  ibase: {
    borderWidth: 1,
    borderStyle: 'solid',
    padding: '3px 9px 3px 14px',
    borderRadius: 4,
    borderColor: 'rgb(241, 241, 241)',
  },
  rootModal: {
    '& > .MuiBackdrop-root': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  content: {
    padding: theme.spacing(1),
  },
}));

const CreateNotePreview = () => {
  const [show, setShow] = useState(false);
  const styles = useStyles();

  const handleShow = useCallback(() => {
    setShow(true);
  }, []);

  const handleHidden = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <>
      <InputBase
        disabled
        onClick={handleShow}
        className={styles.ibase}
        name="title"
        placeholder="Add a note"
        fullWidth
        id="title"
        endAdornment={(
          <InputAdornment position="start">
            <FaPlusCircle size={16} className={styles.iconAdd} />
          </InputAdornment>
        )}
      />
      <Dialog
        PaperProps={{
          elevation: 1,
        }}
        open={show}
        onClose={handleHidden}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={styles.rootModal}
      >
        <DialogContent className={styles.content}>
          <CreateNote onClose={handleHidden} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateNotePreview;
