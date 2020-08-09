import { connect } from 'react-redux';
import { user } from '../../store/selectors';
import { RootState } from '../../store/models';
import { Login } from './login';

const mapStateToProps = (state: RootState) => ({
  hasSetPassword: user.getHasSetPassword(state),
  userState: user.getSignInState(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
