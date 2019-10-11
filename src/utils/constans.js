/* eslint-disable camelcase */
// redux actions
export const actionsNames = {
  // notes actions
  NOTE_LIST: 'NOTE_LIST',
  EDIT_NOTE: 'EDIT_NOTE',
  REMOVE_NOTE: 'REMOVE_NOTE',
  STORE_NOTES_FROM_DB: 'STORE_NOTES_FROM_DB',
  SYNC_NOTES_FROM_DB: 'SYNC_NOTES_FROM_DB',
  // components actions
  SHOW_MODAL_EDIT_NOTE: 'SHOW_MODAL_EDIT_NOTE',
  // todos actions
  TODO_LIST: 'TODO_LIST',
  ADD_ITEM: 'ADD_ITEM',
  DELETE_ITEM: 'DELETE_ITEM',
  DELETE_TODO: 'DELETE_TODO',
  // auth
  AUTH: 'AUTH',
};

// collections names
export const colletionsNames = {
  notes: 'notes',
  todos: 'todos',
  // users: 'users',
  profile: 'profiles',
};

// sub collections names
export const subColletionsNames = {
  notesList: 'notes-list',
  todoslistCN: 'todos-list',
};
