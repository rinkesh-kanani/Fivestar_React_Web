import { combineReducers } from 'redux';
import DubaiStockReducer from './DubaiStockReducer';

const DubaiStockReducers = combineReducers({
  DubaiStock: DubaiStockReducer
});

export default DubaiStockReducers;
