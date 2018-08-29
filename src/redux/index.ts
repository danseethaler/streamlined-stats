import {createStore} from 'redux';
import {loadState} from './localStorage';
import rootReducer from './reducers';

const persistedState = loadState();
const store = createStore(rootReducer, persistedState);

export default store;
