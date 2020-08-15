import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

type Page = {
  name: string;
  url: string;
  key: string;
  show: boolean;
};

const RECEPTIONIST = 'RECEPTIONIST';

export const Navbar: React.FC<RouteComponentProps> = ({ history, location }) => {
  const [current, setCurrent] = useState<string>(location.pathname.replace(/\//, '') || 'dashboard');
  const role = JSON.parse(localStorage.getItem('role') || '');
  const pages: Array<Page> = [
    { name: 'Dashboard', url: '/', key: 'dashboard', show: true },
    { name: 'Scheduler', url: '/scheduler', key: 'scheduler', show: true },
    { name: 'Createuser', url: '/createuser', key: 'createuser', show: role === RECEPTIONIST },
  ];

  const handleClick = (page: Page) => {
    history.push(page.url);
    setCurrent(page.key);
  };

  const logout = () => {
    localStorage.setItem('token', '');
    history.push('/login');
  };

  return (
    <>
      <Menu selectedKeys={[current]} mode="horizontal" theme="dark">
        {pages.map(
          (page: Page) =>
            page.show && (
              <Menu.Item onClick={() => handleClick(page)} key={page.key}>
                {page.name}
              </Menu.Item>
            ),
        )}
        <div className="logout">
          <Dropdown.Button
            size="large"
            overlay={
              <Menu>
                <Menu.Item>Account</Menu.Item>
                <Menu.Item onClick={logout}>Logout</Menu.Item>
              </Menu>
            }
            icon={<AccountCircleIcon fontSize="default" />}
          />
        </div>
      </Menu>
    </>
  );
};
