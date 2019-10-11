/* eslint-disable react/self-closing-comp */
/* eslint-disable arrow-body-style */
import React from 'react';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CreateNotePreview from './CreateNotePreview';
import NotePreview from './NotePreview';
import NoteHeader from './NoteHeader';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    boxSizing: 'border-box',
  },
  notePreviewWrapper: {
    marginTop: theme.spacing(5),
  },
}));


const NotesView = ({ notesList }) => {
  const styles = useStyles();
  const renderData = notesList ? Object.values(notesList) : [];
  return (
    <>
      <NoteHeader />
      <Container maxWidth="sm">
        <div className={styles.root}>
          <CreateNotePreview />
        </div>
        <div className={styles.notePreviewWrapper}>
          {renderData.map((e) => <NotePreview key={e.tempId || e.id} title={e.title} tempId={e.tempId} content={e.content} id={e.id} />)}
        </div>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  notesList: state.notes.notesList,
});

export default connect(mapStateToProps)(NotesView);
