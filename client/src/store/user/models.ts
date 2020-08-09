export type State = {
  signin: GeneralState | undefined;
  resetpassword: GeneralState | undefined;
  createuser: GeneralState | undefined;
};

export type GeneralState = {
  data: UserInformation | undefined;
  error: string;
  pending: boolean;
};

export type UserInformation = {
  token: string;
  user: User;
};

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  id: number;
  role: string;
  hasSetPassword: boolean;
};
