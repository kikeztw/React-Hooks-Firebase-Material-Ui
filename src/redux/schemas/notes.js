/* eslint-disable import/prefer-default-export */
import { schema } from 'normalizr';

export const localNotes = new schema.Entity('notes', {}, {
  idAttribute: 'tempId',
});

export const cloudNotes = [new schema.Entity('notes')];
