import { actionsNames } from '../../utils/constans';

const { SHOW_MODAL_EDIT_NOTE } = actionsNames;

const initialState = {
  isShowModalEdit: false,
};

function modalsReducers(state = initialState, actions) {
  const { type, payload } = actions;
  switch (type) {
    case SHOW_MODAL_EDIT_NOTE:
      return { ...state, isShowModalEdit: payload };
    default:
      return state;
  }
}

export default modalsReducers;
