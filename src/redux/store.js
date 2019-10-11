import { createStore } from 'redux';
import { persistStore } from 'redux-persist';
import reducer from './reducers/index';


export const store = createStore(reducer);
export const persistor = persistStore(store);
