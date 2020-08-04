import { Action, handleActions } from 'redux-actions';
import { signIn } from './actions';
import { UserState } from './models';

const initialState: UserState = {
  data: undefined,
  error: '',
  pending: false,
};

const signUpSuccess = (state: UserState, { payload }: Action<UserState>) => ({
  ...state,
  data: payload,
  pending: false,
});

const signUpError = (state: UserState, { payload }: Action<UserState>) => ({
  ...state,
  error: payload,
  pending: false,
});

const signUpPending = (state: UserState, { payload }: Action<UserState>) => ({
  ...state,
  pending: true,
});

export default handleActions<any, any>(
  {
    [signIn.TRIGGER]: signUpPending,
    [signIn.SUCCESS]: signUpSuccess,
    [signIn.FAILURE]: signUpError,
  },
  initialState,
);
