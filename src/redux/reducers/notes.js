import { actionsNames } from '../../utils/constans';
import initialState from './initialStates';

const {
  NOTE_LIST,
  REMOVE_NOTE,
  STORE_NOTES_FROM_DB,
  SYNC_NOTES_FROM_DB,
} = actionsNames;

function notesReducers(state = initialState.notes, actions) {
  const { type, payload } = actions;
  switch (type) {
    case NOTE_LIST:
      return { ...state, notesList: { ...state.notesList, ...payload } };
    case REMOVE_NOTE:
      return { ...state, notesList: { ...payload } };
    case STORE_NOTES_FROM_DB:
      return { ...state, notesList: { ...payload } };
    case SYNC_NOTES_FROM_DB:
      return { ...state, notesList: { ...state.notesList, ...payload } };
    default:
      return state;
  }
}

export default notesReducers;
