import { createRoutine, Routine } from 'redux-saga-routines';

export const actionTypes = {
  CREATE_USER: 'CREATE_USER',
};

export const createUser: Routine = createRoutine(actionTypes.CREATE_USER);
