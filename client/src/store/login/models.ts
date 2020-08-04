export type ExampleData = {
  data: any;
  error: string;
  pending: boolean;
};

export type UserState = {
  user: User;
  error: string;
  pending: boolean;
};

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  id: number;
};
