import { UserState } from './signin/models';
import { SignUpState } from './signup/models';
import { CreateUserState } from './createuser/models';

export type GenericResponse = {
  data: any;
  error: string;
  pending: boolean;
};

export type RootState = {
  signin: UserState;
  signup: SignUpState;
  createuser: CreateUserState;
};
