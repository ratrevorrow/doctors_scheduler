import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store/models';
import * as actions from '../../store/actions';
import { signIn } from '../../store/selectors';
import { User } from '../../store/signin/models';

import './home.scss';

const Home: React.FC<{ user: User | undefined }> = ({ user }) => {
  return (
    <div className="center-container">
      <div>
        <h1>Hi {`${user?.firstName} ${user?.lastName}`}!</h1>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({ user: signIn.getUser(state) });

const mapDispatchToProps = {
  signIn: actions.signIn.signIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
