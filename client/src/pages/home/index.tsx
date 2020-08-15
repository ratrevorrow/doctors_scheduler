import { connect } from 'react-redux';
import { RootState } from '../../store/models';
import * as actions from '../../store/actions';
import { user } from '../../store/selectors';
import { Home } from './home';

import './home.scss';

const mapStateToProps = (state: RootState) => ({ user: user.getUser(state) });

const mapDispatchToProps = {
  signIn: actions.user.signIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
