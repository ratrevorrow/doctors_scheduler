import { RootState } from '../models';
import { UserState } from './models';
import { UserInformation } from './models';
import { User } from './models';

const DOMAIN = 'signin';

const getState = (state: RootState): UserState => state[DOMAIN];

export const getUserState = (state: RootState): UserState => getState(state);
export const getUserInformation = (state: RootState): UserInformation | undefined => getUserState(state).data;
export const getToken = (state: RootState): string | undefined => getUserState(state).data?.token;
export const getUser = (state: RootState): User | undefined => getUserState(state).data?.user;
