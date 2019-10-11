/* eslint-disable import/prefer-default-export */
import { actionsNames } from '../../utils/constans';

const { SHOW_MODAL_EDIT_NOTE } = actionsNames;


export const handleModalEditNote = (value) => ({ type: SHOW_MODAL_EDIT_NOTE, payload: value });
