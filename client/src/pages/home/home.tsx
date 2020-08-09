import React from 'react';
import { User } from '../../store/user/models';

import './home.scss';

export const Home: React.FC<{ user: User | undefined }> = ({ user }) => {
  return (
    <div className="center-container">
      <div>
        <h1>Hi {`${user?.firstName} ${user?.lastName}`}!</h1>
      </div>
    </div>
  );
};
