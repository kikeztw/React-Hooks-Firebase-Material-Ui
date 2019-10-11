import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// reducers
import profileReducer from './profile';
import todoReducer from './todos'; // todo actions
import componentsReducer from './components';
import notesReducer from './notes';
import authReducer from './auth';

const persistConfigProfile = {
  key: 'profile',
  storage,
};

const persistConfigtodos = {
  key: 'todos',
  storage,
};

const persistConfigNotes = {
  key: 'notes',
  storage,
};

const persistConfigAuth = {
  key: 'auth',
  storage,
  blacklist: ['authProfile'],
};


const appReducer = combineReducers({
  todos: persistReducer(persistConfigtodos, todoReducer),
  profile: persistReducer(persistConfigProfile, profileReducer),
  components: componentsReducer,
  notes: persistReducer(persistConfigNotes, notesReducer),
  auth: persistReducer(persistConfigAuth, authReducer),
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    localStorage.removeItem('persist:notes');
    localStorage.removeItem('persist:todos');
    localStorage.removeItem('persist:auth');
    localStorage.removeItem('persist:profile');
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
