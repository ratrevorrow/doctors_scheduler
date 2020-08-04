import { createRoutine, Routine } from 'redux-saga-routines';

export const actionTypes = {
  SIGN_UP: 'SIGN_UP',
};

export const signUp: Routine = createRoutine(actionTypes.SIGN_UP);
