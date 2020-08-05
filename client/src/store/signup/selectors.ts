import { RootState } from '../models';
import { SignUpState } from './models';

const DOMAIN = 'signup';

const getState = (state: RootState): SignUpState => state[DOMAIN];

// getState
export const getSignUpState = (state: RootState): SignUpState => getState(state);
