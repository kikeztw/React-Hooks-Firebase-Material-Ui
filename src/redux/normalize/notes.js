/* eslint-disable import/prefer-default-export */
import { normalize } from 'normalizr';
import {
  localNotes,
  cloudNotes,
} from '../schemas/notes';


export const localNoteNormalize = (data) => normalize(data, localNotes);
export const cloudNotesNormalize = (data) => normalize(data, cloudNotes);
