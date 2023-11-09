import { combineReducers } from 'redux';
import { createReducer } from '../../../helpers/reduxHelpers';
import * as Actions from '../../actions/types';

const setWorldwideStockListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_WORLD_WIDE_STOCK_LIST
});

const WorldwideStockReducer = combineReducers({
  WorldwideStockList: setWorldwideStockListReducer
});

export default WorldwideStockReducer;
