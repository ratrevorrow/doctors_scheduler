import { RootState } from '../models';
import { State, UserInformation, User, GeneralState } from './models';

export const getUserState = (state: RootState): State => state.user;

// getUserState
export const getSignInState = (state: RootState): GeneralState | undefined => getUserState(state).signin;
export const getCreateUserState = (state: RootState): GeneralState | undefined => getUserState(state).createuser;
export const getResetPasswordState = (state: RootState): GeneralState | undefined => getUserState(state).resetpassword;

// getUserState
export const getUserInformation = (state: RootState): UserInformation | undefined => getUserState(state)?.signin?.data;

// getUserInformation
export const getToken = (state: RootState): string | undefined => getUserInformation(state)?.token;
export const getUser = (state: RootState): User | undefined => getUserInformation(state)?.user;

// getUser
export const getRole = (state: RootState): string | undefined => getUser(state)?.role;
export const getHasSetPassword = (state: RootState): boolean | undefined => getUser(state)?.hasSetPassword;
export const getEmail = (state: RootState): string | undefined => getUser(state)?.email;
