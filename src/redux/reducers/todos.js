/* eslint-disable max-len */
import initialState from './initialStates';
import { actionsNames } from '../../utils/constans';

const {
  TODO_LIST,
  ADD_ITEM,
  DELETE_ITEM,
  DELETE_TODO,
} = actionsNames;

function todosReducer(state = initialState.todos, actions) {
  const { type, payload } = actions;
  switch (type) {
    case TODO_LIST:
      return {
        ...state,
        todosList: {
          ...state.todosList,
          ...payload,
        },
      };
    case ADD_ITEM:
      return {
        ...state,
        todosItems: {
          ...state.todosItems,
          ...payload,
        },
      };
    case DELETE_ITEM:
      return {
        ...state,
        todosItems: {
          ...payload,
        },
      };
    case DELETE_TODO:
      return {
        ...state,
        todosList: {
          ...payload,
        },
      };
    default:
      return state;
  }
}

export default todosReducer;
