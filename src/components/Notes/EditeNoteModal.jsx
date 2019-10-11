/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable react/self-closing-comp */
/* eslint-disable arrow-body-style */
import React, { memo, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditeNote from './EditeNote';
import { handleModalEditNote } from '../../redux/actions/components';


const useStyles = makeStyles((theme) => ({
  rootModal: {
    '& > .MuiBackdrop-root': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  content: {
    padding: theme.spacing(1),
  },
}));

const EditNoteModal = (props) => {
  const { isShowModal } = props;
  const styles = useStyles();

  const handleHidden = useCallback(() => {
    const { handleModalEditNote, history } = props;
    handleModalEditNote();
    history.goBack();
  }, []);

  const { match } = props;
  return (
    <Dialog
      PaperProps={{
        elevation: 1,
      }}
      open={isShowModal || match.params.id.length > 0}
      onClose={handleHidden}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={styles.rootModal}
    >
      <DialogContent className={styles.content}>
        <EditeNote onClose={handleHidden} id={match.params && match.params.id} />
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = (state) => ({
  isShowModal: state.components.isShowModalEdit,
});

const mapDispatchToProps = (dispatch) => ({
  handleModalEditNote: () => dispatch(handleModalEditNote(false)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditNoteModal));
