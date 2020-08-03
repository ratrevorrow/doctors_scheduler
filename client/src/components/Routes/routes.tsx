import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { GenericResponse } from '../../store/models';
import Navbar from '../Navbar';
import Login from '../../pages/login';

interface Props {
  data: GenericResponse;
}

const Routes: React.FC<Props> = ({ data }) => {
  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);

  console.log(data);

  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Switch>
        <Route exact path="/" component={Login} />
        {/* <Route exact path="/home" component={Navbar} /> */}
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = (state: GenericResponse) => ({ data: { ...state } });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
