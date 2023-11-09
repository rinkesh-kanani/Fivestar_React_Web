import { combineReducers } from 'redux';
import { createReducer } from '../../../helpers/reduxHelpers';
import * as Actions from '../../actions/types';

const setHoldListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_HOLD_LIST
});

const HoldReducer = combineReducers({
  HoldList: setHoldListReducer
});

export default HoldReducer;
