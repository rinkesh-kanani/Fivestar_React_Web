import { combineReducers } from 'redux';
import WorldwideStockReducer from './WorldwideStockReducer';

const WorldwideStockReducers = combineReducers({
  WorldwideStock: WorldwideStockReducer
});

export default WorldwideStockReducers;
