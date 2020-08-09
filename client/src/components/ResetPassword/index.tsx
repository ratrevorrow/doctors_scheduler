import { connect } from 'react-redux';
import { ResetPassword } from './resetpassword';
import { user } from '../../store/selectors';
import { RootState } from '../../store/models';
import * as actions from '../../store/actions';

const mapStateToProps = (state: RootState) => ({
  email: user.getEmail(state),
  signUpState: user.getResetPasswordState(state),
});

const mapDispatchToProps = {
  signUp: actions.user.resetPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
