import { createRoutine, Routine } from 'redux-saga-routines';

export const actionTypes = {
  SIGN_UP: 'SIGN_UP',
  SIGN_IN: 'SIGN_IN',
};

export const signUp: Routine = createRoutine(actionTypes.SIGN_UP);
export const signIn: Routine = createRoutine(actionTypes.SIGN_IN);
