import { combineReducers } from 'redux-immutable';
import { mainReducer } from './redux';

const rootReducer = combineReducers({ main: mainReducer });

export default rootReducer;
