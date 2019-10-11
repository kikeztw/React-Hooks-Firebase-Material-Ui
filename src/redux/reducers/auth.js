import { actionsNames } from '../../utils/constans';
import initialState from './initialStates';

const { AUTH } = actionsNames;


function authReducer(state = initialState.auth, actions) {
  const { type, payload } = actions;
  switch (type) {
    case AUTH:
      return { ...state, ...payload };
    case 'SWITCH_IS_NEW_STATUS':
      return { ...state, isNewUser: payload };
    default:
      return state;
  }
}

export default authReducer;
