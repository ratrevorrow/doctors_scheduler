import { createRoutine, Routine } from 'redux-saga-routines';

export const actionTypes = {
  SIGN_IN: 'SIGN_IN',
};

export const signIn: Routine = createRoutine(actionTypes.SIGN_IN);
