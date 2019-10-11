import React, { useEffect, PureComponent, memo } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import {
  NotesView,
  EditeNoteModal,
} from '../../components/Notes';

const Notes = (props) => {
  const { match } = props;
  const { path } = match;
  return (
    <>
      <Route path={path} component={NotesView} />
      <Route path={`${path}/:id`} component={EditeNoteModal} />
    </>
  );
};

export default connect()(memo(Notes));
