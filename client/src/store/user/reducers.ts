import { Action, handleActions } from 'redux-actions';
import { State, GeneralState } from './models';
import { createUser, signIn, resetPassword } from './actions';

const initialResponse: GeneralState = {
  data: undefined,
  error: '',
  pending: false,
};

const initialState: State = {
  signin: { ...initialResponse },
  resetpassword: { ...initialResponse },
  createuser: { ...initialResponse },
};

const getKey = (type: string): string => type.split('/')[0].replace(/_/g, '').toLocaleLowerCase();

const success = (state: State, { type, payload }: Action<State>) => ({
  ...state,
  [getKey(type)]: {
    data: payload,
    error: '',
    pending: false,
  },
});

const error = (state: State, { type, payload }: Action<State>) => ({
  ...state,
  [getKey(type)]: {
    data: undefined,
    error: payload,
    pending: false,
  },
});

const pending = (state: State, { type }: Action<State>) => ({
  ...state,
  [getKey(type)]: {
    data: undefined,
    error: '',
    pending: true,
  },
});

export default handleActions<State, any>(
  {
    [signIn.TRIGGER ||
    signIn.REQUEST ||
    createUser.TRIGGER ||
    createUser.REQUEST ||
    resetPassword.TRIGGER ||
    resetPassword.REQUEST]: pending,
    [signIn.SUCCESS || createUser.SUCCESS || resetPassword.SUCCESS]: success,
    [signIn.FAILURE || createUser.FAILURE || resetPassword.FAILURE]: error,
  },
  initialState,
);
