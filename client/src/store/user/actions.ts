import { createRoutine, Routine } from 'redux-saga-routines';

export const actionTypes = {
  CREATE_USER: 'CREATE_USER',
  SIGN_IN: 'SIGN_IN',
  RESET_PASSWORD: 'RESET_PASSWORD',
};

export const resetPassword: Routine = createRoutine(actionTypes.RESET_PASSWORD);
export const createUser: Routine = createRoutine(actionTypes.CREATE_USER);
export const signIn: Routine = createRoutine(actionTypes.SIGN_IN);
