import { RootState } from '../models';
import { UserState } from './models';
import { UserInformation } from './models';
import { User } from './models';

const DOMAIN = 'signin';

const getState = (state: RootState): UserState => state[DOMAIN];

// getState
export const getUserState = (state: RootState): UserState => getState(state);

// getUserState
export const getUserInformation = (state: RootState): UserInformation | undefined => getUserState(state).data;

// getUserInformation
export const getToken = (state: RootState): string | undefined => getUserInformation(state)?.token;
export const getUser = (state: RootState): User | undefined => getUserInformation(state)?.user;

// getUser
export const getRole = (state: RootState): string | undefined => getUser(state)?.role;
export const getHasSetPassword = (state: RootState): boolean | undefined => getUser(state)?.hasSetPassword;
