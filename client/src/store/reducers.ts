import { combineReducers } from 'redux';
import signup from './signup/reducers';
import signin from './signin/reducers';

export const rootReducers = combineReducers({ signup, signin });
