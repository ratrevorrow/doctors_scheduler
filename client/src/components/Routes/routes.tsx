import React, { useEffect } from 'react';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import { UserInformation } from '../../store/user/models';
import Navbar from '../Navbar';
import Login from '../../pages/Login';
import CreateUser from '../../pages/CreateUser';
import Home from '../../pages/Home';
import Scheduler from '../../pages/Scheduler';

interface Props {
  userInformation: UserInformation | undefined | string;
  hasSetPassword: boolean | undefined;
}

export const Routes: React.FC<RouteComponentProps & Props> = ({
  userInformation,
  hasSetPassword,
  history,
  location,
}) => {
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
