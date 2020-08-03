import { Action, handleActions } from 'redux-actions';
import { signIn, signUp } from './actions';
import { User } from './models';
import { GenericResponse } from '../models';

const initialState: GenericResponse = {
  data: '',
  error: '',
  pending: false,
};

const fetchDataSuccess = (state: GenericResponse, { payload }: Action<GenericResponse>) => ({
  ...state,
  data: payload,
  pending: false,
});

const fetchDataError = (state: GenericResponse, { payload }: Action<GenericResponse>) => ({
  ...state,
  error: payload,
  pending: false,
});

// const fetchDataPending = (state: GenericResponse, { payload }: Action<GenericResponse>) => ({
//   ...state,
//   pending: true,
// });

export default handleActions<any>(
  {
    [signUp.SUCCESS]: fetchDataSuccess,
    // [signUp.REQUEST]: fetchDataPending,
    [signUp.FAILURE]: fetchDataError,
    [signIn.SUCCESS]: fetchDataSuccess,
    // [signIn.REQUEST]: fetchDataPending,
    [signIn.FAILURE]: fetchDataError,
  },
  initialState,
);
