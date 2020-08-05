import React, { useEffect } from 'react';
import { Route, Switch, RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../../store/models';
import { UserInformation } from '../../store/signin/models';
import Navbar from '../Navbar';
import Login from '../../pages/login';
import CreateUser from '../../pages/createuser';
import Home from '../../pages/home';
import Scheduler from '../../pages/scheduler';
import { signIn } from '../../store/selectors';

interface Props {
  userInformation: UserInformation | undefined;
  hasSetPassword: boolean | undefined;
}

const Routes: React.FC<RouteComponentProps & Props> = ({ userInformation, hasSetPassword, history, location }) => {
  useEffect(() => {
    if (!hasSetPassword) history.push('/login');
    else history.push('/');
  }, [history, userInformation, hasSetPassword]);

  return (
    <>
      {!location.pathname.includes('login') && <Navbar />}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/scheduler" component={Scheduler} />
        <Route exact path="/createuser" component={CreateUser} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  userInformation: signIn.getUserInformation(state),
  hasSetPassword: signIn.getHasSetPassword(state),
});

export default withRouter(connect(mapStateToProps)(Routes));
