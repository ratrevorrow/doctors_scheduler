import { connect } from 'react-redux';
import { RootState } from '../../store/models';
import { Scheduler } from './scheduler';
import { user } from '../../store/selectors';

const mapStateToProps = (state: RootState) => ({ userState: user.getSignInState(state) });

export default connect(mapStateToProps)(Scheduler);
