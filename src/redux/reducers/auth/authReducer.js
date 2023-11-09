import { combineReducers } from 'redux';
import { createReducer } from '../../../helpers/reduxHelpers';
import * as Actions from './../../actions/types';

const currentUserReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_CURRENT_USER
});

const authReducer = combineReducers({
  currentUser: currentUserReducer
});

export default authReducer;
