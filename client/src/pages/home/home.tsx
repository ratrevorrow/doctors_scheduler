import React, { useEffect, useState } from 'react';
import { User } from '../../store/user/models';
import { getProtocol } from '../../util/api';
import './home.scss';
import MaterialTable, { Column } from 'material-table';

interface Row {
  name: string;
  surname: string;
  birthYear: number;
  birthCity: number;
}

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

export const Home: React.FC<{ user: User | undefined }> = ({ user }) => {
  const [state, setState] = React.useState<TableState>({
    columns: [
      { title: 'Email', field: 'email' },
      { title: 'First Name', field: 'first_name' },
      { title: 'Last Name', field: 'last_name' },
      { title: 'Role', field: 'role' },
    ],
    data: [],
  });

  useEffect(() => {
    getProtocol('http://localhost:8000/api/users').then((res) =>
      setState({
        ...state,
        data: res,
      }),
    );
  }, [user]);
  console.log(state);
  return (
    <div className="center-container">
      <div>
        <h1>Hi {`${user?.firstName} ${user?.lastName}`}!</h1>
        <div style={{width: '100vh'}}>
          <MaterialTable
            title="Editable Example"
            columns={state.columns}
            data={state.data}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    setState((prevState) => {
                      const data = [...prevState.data];
                      data.push(newData);
                      return { ...prevState, data };
                    });
                  }, 600);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    if (oldData) {
                      setState((prevState) => {
                        const data = [...prevState.data];
                        data[data.indexOf(oldData)] = newData;
                        return { ...prevState, data };
                      });
                    }
                  }, 600);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    setState((prevState) => {
                      const data = [...prevState.data];
                      data.splice(data.indexOf(oldData), 1);
                      return { ...prevState, data };
                    });
                  }, 600);
                }),
            }}
          />
        </div>
      </div>
    </div>
  );
};
