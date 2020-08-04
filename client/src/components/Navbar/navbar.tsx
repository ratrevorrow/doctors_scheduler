import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Menu } from 'antd';

type Pages = {
  home: Page;
  scheduler: Page;
};

type Page = {
  url: string;
  key: string;
};

const pages: Pages = {
  home: { url: '/', key: 'dashboard' },
  scheduler: { url: '/scheduler', key: 'scheduler' },
};

const Navbar: React.FC<RouteComponentProps> = ({ history, location }) => {
  const [current, setCurrent] = useState<string>(location.pathname.replace(/\//, '') || 'dashboard');
  const handleClick = (page: Page) => {
    history.push(page.url);
    setCurrent(page.key);
  };

  return (
    <Menu selectedKeys={[current]} mode="horizontal" theme="dark">
      <Menu.Item onClick={() => handleClick(pages.home)} key="dashboard">
        Dashboard
      </Menu.Item>
      <Menu.Item onClick={() => handleClick(pages.scheduler)} key="scheduler">
        Scheduler
      </Menu.Item>
    </Menu>
  );
};

export default withRouter(Navbar);
