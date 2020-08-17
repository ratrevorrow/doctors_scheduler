import React, { useEffect, useState } from 'react';
import { User } from '../../store/user/models';
import { getProtocol } from '../../util/api';
import MaterialTable, { Column } from 'material-table';

interface Row {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

export const Home: React.FC<{ user: User | undefined }> = ({ user }) => {
  const [state, setState] = useState<TableState>({
    columns: [
      { title: 'Email', field: 'email' },
      { title: 'First Name', field: 'firstName' },
      { title: 'Last Name', field: 'lastName' },
      { title: 'Role', field: 'role' },
    ],
    data: [],
  });

  useEffect(() => {
    user &&
      getProtocol('http://localhost:8000/api/users').then((res) =>
        setState({
          ...state,
          data: res,
        }),
      );
  }, [user]);

  return (
    <div className="center-container">
      <div>
        <h1>Hi {`${user?.firstName} ${user?.lastName}`}!</h1>
        <div style={{ width: '100vh' }}>
          <MaterialTable title="Users" columns={state.columns} data={state.data} />
        </div>
      </div>
    </div>
  );
};

Home.defaultProps = {
  user: {
    firstName: 'Mr.',
    lastName: 'Tester',
    email: '',
    id: 0,
    hasSetPassword: true,
    role: 'RECEPTIONIST',
  },
};
