import { connect } from 'react-redux';
import { Routes } from './routes';
import { withRouter } from 'react-router-dom';
import { user } from '../../store/selectors';
import { RootState } from '../../store/models';

const mapStateToProps = (state: RootState) => ({
  userInformation: user.getUserInformation(state),
  hasSetPassword: user.getHasSetPassword(state),
});

export default withRouter(connect(mapStateToProps)(Routes));
