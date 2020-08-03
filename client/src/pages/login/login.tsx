import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Routine } from 'redux-saga-routines';
import * as actions from '../../store/actions';
import { ExampleData } from '../../store/login/models';
import SignIn from '../../components/SignIn';
import SignUp from '../../components/SignUp';

interface Props {
  fetchData: Routine;
  data: ExampleData;
}

const Login: React.FC<Props> = () => {
  //   useEffect(() => {
  //     fetchData();
  //   }, [fetchData]);

  return <SignUp />;
};

const mapStateToProps = (state: ExampleData) => ({ data: { ...state } });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
