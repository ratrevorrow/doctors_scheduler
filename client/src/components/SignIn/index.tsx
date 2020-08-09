import { RootState } from '../../store/models';
import * as actions from '../../store/actions';
import { user } from '../../store/selectors';
import { connect } from 'react-redux';
import { SignIn } from './signin';

const mapStateToProps = (state: RootState) => ({ userState: user.getSignInState(state) });

const mapDispatchToProps = {
  signIn: actions.user.signIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
