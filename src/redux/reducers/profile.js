import initialState from './initialStates';

function profileReducer(state = initialState.profile, actions) {
  const { type, payload } = actions;
  switch (type) {
    case 'ADD_PROFILE':
      return { ...payload };
    case 'LOG_OUT':
      return initialState.profile;
    default:
      return state;
  }
}

export default profileReducer;
