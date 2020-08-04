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
  first_name: string;
  last_name: string;
  email: string;
  id: number;
  role: string;
};
