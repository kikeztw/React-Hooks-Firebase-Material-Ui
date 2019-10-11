/* eslint-disable import/prefer-default-export */
import { schema } from 'normalizr';

export const localTodos = new schema.Entity('todo', {}, {
  idAttribute: 'tempId',
});

export const localItems = new schema.Entity('item', {}, {
  idAttribute: 'tempId',
});

export const localTodosWithId = new schema.Entity('todo');
export const localItemssWithId = new schema.Entity('item');


export const todo = new schema.Entity('todo', {
  items: [new schema.Entity('items')],
});

export const syncTodo = [todo];
