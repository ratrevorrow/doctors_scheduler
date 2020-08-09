import { connect } from 'react-redux';
import { RootState } from '../../store/models';
import * as actions from '../../store/actions';
import { CreateUser } from './createuser';

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = {
  createUser: actions.user.createUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
