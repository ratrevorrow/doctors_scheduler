import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { postProtocol } from '../../util/api';

import './navbar.scss';

type Pages = {
  home: Page;
  scheduler: Page;
  createuser: Page;
};

type Page = {
  url: string;
  key: string;
};

const pages: Pages = {
  home: { url: '/', key: 'dashboard' },
  scheduler: { url: '/scheduler', key: 'scheduler' },
  createuser: { url: '/createuser', key: 'createuser' },
};

const roles = {
  PATIENT: 'PATIENT',
  DOCTOR: 'DOCTOR',
  RECEPTIONIST: 'RECEPTIONIST',
};

const Navbar: React.FC<RouteComponentProps> = ({ history, location }) => {
  const [current, setCurrent] = useState<string>(location.pathname.replace(/\//, '') || 'dashboard');
  const handleClick = (page: Page) => {
    history.push(page.url);
    setCurrent(page.key);
  };
  const role = JSON.parse(localStorage.getItem('role') || '');
  const logout = () => {
    localStorage.setItem('token', '');
    postProtocol('http://localhost:8000/api/logout', {}).then((res) => console.log(res));
    history.push('/');
  };
  const menu: JSX.Element = (
    <Menu>
      <Menu.Item>Account</Menu.Item>
      <Menu.Item onClick={logout}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <>
      <Menu selectedKeys={[current]} mode="horizontal" theme="dark">
        <Menu.Item onClick={() => handleClick(pages.home)} key="dashboard">
          Dashboard
        </Menu.Item>
        <Menu.Item onClick={() => handleClick(pages.scheduler)} key="scheduler">
          Scheduler
        </Menu.Item>
        {role === roles.RECEPTIONIST && (
          <Menu.Item onClick={() => handleClick(pages.createuser)} key="createuser">
            Create User
          </Menu.Item>
        )}
        <div className="logout">
          <Dropdown.Button size="large" overlay={menu} icon={<AccountCircleIcon fontSize="default" />} />
        </div>
      </Menu>
    </>
  );
};

export default withRouter(Navbar);
