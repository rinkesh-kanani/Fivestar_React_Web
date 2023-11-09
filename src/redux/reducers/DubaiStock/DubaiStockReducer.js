import { combineReducers } from 'redux';
import { createReducer } from '../../../helpers/reduxHelpers';
import * as Actions from '../../actions/types';

const setDubaiStockListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_DUBAI_STOCK_LIST
});

const setMembershipListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_MEMBERSHIP_LIST
});

const DubaiStockReducer = combineReducers({
  DubaiStockList: setDubaiStockListReducer,
  membershipList: setMembershipListReducer
});

export default DubaiStockReducer;
