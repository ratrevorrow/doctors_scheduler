import { UserState } from './signin/models';
import { SignUpState } from './signup/models';

export type GenericResponse = {
  data: any;
  error: string;
  pending: boolean;
};

export type RootState = {
  signin: UserState;
  signup: SignUpState;
};
