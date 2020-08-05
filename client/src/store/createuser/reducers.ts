import { Action, handleActions } from 'redux-actions';
import { createUser } from './actions';
import { CreateUserState } from './models';

const initialState: CreateUserState = {
  data: undefined,
  error: '',
  pending: false,
};

const createUserSuccess = (state: CreateUserState, { payload }: Action<CreateUserState>) => ({
  ...state,
  data: payload,
  pending: false,
});

const createUserError = (state: CreateUserState, { payload }: Action<CreateUserState>) => ({
  ...state,
  error: payload,
  pending: false,
});

const createUserPending = (state: CreateUserState, { payload }: Action<CreateUserState>) => ({
  ...state,
  pending: true,
});

export default handleActions<any, any>(
  {
    [createUser.TRIGGER]: createUserPending,
    [createUser.SUCCESS]: createUserSuccess,
    [createUser.FAILURE]: createUserError,
  },
  initialState,
);
