/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/self-closing-comp */
/* eslint-disable arrow-body-style */
import React, { memo, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Typography,
  Grow,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { handleModalEditNote } from '../../redux/actions/components';
import NotesPreviewDelete from './NotesPreviewDelete';

const useStyles = makeStyles((theme) => ({
  noteContainer: {
    border: '1px solid rgb(241, 241, 241)',
    borderRadius: 4,
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  noteHeader: {
    padding: theme.spacing(1, 0),
  },
  content: {
    marginTop: theme.spacing(1),
    textAlign: 'justify',
  },
  notepreviewcontainer: {
    position: 'relative',
  },
}));

const PrevieNote = (props) => {
  const styles = useStyles();

  const handleShow = useCallback(() => {
    const {
      showEditModal, history, id, tempId,
    } = props;
    history.push(`notes/${id || tempId}`);
    showEditModal();
  }, [props]);

  const {
    title, content, id, tempId,
  } = props;

  return (
    <Grow in>
      <div className={styles.notepreviewcontainer}>
        <NotesPreviewDelete id={id || tempId} />
        <div className={styles.noteContainer} onClick={handleShow}>
          <div className={styles.noteHeader}>
            <Grid container>
              <Grid item sm={11}>
                <Typography variant="subtitle1">
                  {title || ''}
                </Typography>
              </Grid>
            </Grid>
          </div>
          <Typography variant="subtitle1" component="p" className={styles.content}>
            {content || ''}
          </Typography>
        </div>
      </div>
    </Grow>
  );
};

const mapDispatchToProps = (dispatch) => ({
  showEditModal: () => dispatch(handleModalEditNote(true)),
});

export default withRouter(connect(null, mapDispatchToProps)(memo(PrevieNote)));
