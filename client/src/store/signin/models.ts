export type ExampleData = {
  data: any;
  error: string;
  pending: boolean;
};

export type UserState = {
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
