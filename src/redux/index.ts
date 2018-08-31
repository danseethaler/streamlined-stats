import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {loadState} from './localStorage';
import rootReducer from './reducers';

const persistedState = loadState();
const store = createStore(rootReducer, persistedState, applyMiddleware(thunk));

export default store;
