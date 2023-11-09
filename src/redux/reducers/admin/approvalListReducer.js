import { combineReducers } from 'redux';
import { createReducer } from '../../../helpers/reduxHelpers';
import * as Actions from '../../actions/types';

const setApprovalListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_APPROVAL_LIST
});

const approvalListReducer = combineReducers({
  approvalList: setApprovalListReducer
});

export default approvalListReducer;
