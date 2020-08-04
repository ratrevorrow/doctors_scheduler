import { Action, handleActions } from 'redux-actions';
import { signIn, signUp } from './actions';
import { User } from './models';
import { GenericResponse } from '../models';

const initialState: GenericResponse = {
  data: '',
  error: '',
  pending: false,
};

const signUpSuccess = (state: GenericResponse, { payload }: Action<GenericResponse>) => ({
  ...state,
  data: payload,
  pending: false,
});

const signInSuccess = (state: GenericResponse, { payload }: Action<GenericResponse>) => ({
  ...state,
  data: payload,
  pending: false,
});

const signUpError = (state: GenericResponse, { payload }: Action<GenericResponse>) => ({
  ...state,
  error: payload,
  pending: false,
});

const pending = (state: GenericResponse, { payload }: Action<GenericResponse>) => ({
  ...state,
  pending: true,
});



export default handleActions<any, any>(
  {
    // SIGN UP
    [signUp.SUCCESS]: signUpSuccess,
    [signUp.TRIGGER]: pending,
    [signUp.FAILURE]: signUpError,
    // SIGN IN
    [signIn.SUCCESS]: signUpSuccess,
    [signIn.TRIGGER]: pending,
    [signIn.FAILURE]: signUpError,
  },
  initialState,
);
