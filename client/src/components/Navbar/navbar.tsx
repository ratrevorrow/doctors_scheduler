import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Menu } from 'antd';

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

  return (
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
      {/* <Menu.Item onClick={() => handleClick(pages.createuser)} key="createuser">
        Create User
      </Menu.Item> */}
    </Menu>
  );
};

export default withRouter(Navbar);
