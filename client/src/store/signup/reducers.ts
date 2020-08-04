import { Action, handleActions } from 'redux-actions';
import { signUp } from './actions';
import { SignUpState } from './models';

const initialState: SignUpState = {
  data: '',
  error: '',
  pending: false,
};

const signUpSuccess = (state: SignUpState, { payload }: Action<SignUpState>) => ({
  ...state,
  data: payload,
  pending: false,
});

const signUpError = (state: SignUpState, { payload }: Action<SignUpState>) => ({
  ...state,
  error: payload,
  pending: false,
});

const signUpPending = (state: SignUpState, { payload }: Action<SignUpState>) => ({
  ...state,
  pending: true,
});

export default handleActions<any, any>(
  {
    [signUp.TRIGGER]: signUpPending,
    [signUp.SUCCESS]: signUpSuccess,
    [signUp.FAILURE]: signUpError,
  },
  initialState,
);
