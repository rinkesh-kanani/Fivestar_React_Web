import { combineReducers } from 'redux';
import { createReducer } from '../../../helpers/reduxHelpers';
import * as Actions from '../../actions/types';

const setClientListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_CLIENT_LIST
});

const clientReducer = combineReducers({
  ClientList: setClientListReducer
});

export default clientReducer;
