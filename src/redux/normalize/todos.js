/* eslint-disable import/prefer-default-export */
import { normalize } from 'normalizr';
import {
  localTodos,
  localItems,
  todo,
  syncTodo,
  localTodosWithId,
  localItemssWithId,
} from '../schemas/todos';


export const localTodosNormalize = (data) => normalize(data, localTodos);
export const localItemsNormalize = (data) => normalize(data, localItems);
export const localTodosWithIdNormalize = (data) => normalize(data, localTodosWithId);
export const localItemssWithIddNormalize = (data) => normalize(data, localItemssWithId);

export const todoNormalize = (data) => normalize(data, todo);
export const syncTodoNormalize = (data) => normalize(data, syncTodo);
