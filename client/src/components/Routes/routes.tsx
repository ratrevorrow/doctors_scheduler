import React, { useEffect } from 'react';
import { Route, Switch, RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../../store/models';
import { UserState } from '../../store/signin/models';
import Navbar from '../Navbar';
import Login from '../../pages/login';
import Home from '../../pages/home';
import Scheduler from '../../pages/scheduler';
import { signIn } from '../../store/selectors';

interface Props {
  userState: UserState;
}

const Routes: React.FC<RouteComponentProps & Props> = ({ userState, history, location }) => {
  // useEffect(() => {
  //   if (!userState.data) history.push('/login');
  //   else history.push('/');
  // }, [history, userState.data]);

  return (
    <>
      {!location.pathname.includes('login') && <Navbar />}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/scheduler" component={Scheduler} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </>
  );
};

Routes.defaultProps = {
  userState: {
    data: undefined,
    error: '',
    pending: false,
  },
};

const mapStateToProps = (state: RootState) => ({ userState: signIn.getUserState(state) });

export default withRouter(connect(mapStateToProps)(Routes));
