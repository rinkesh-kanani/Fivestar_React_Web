import { combineReducers } from 'redux';
import adminReducers from './admin';
import authReducer from './auth/authReducer';
import customizer from './customizer/';
import navbar from './navbar/Index';
import technicalReducers from './technical';
import HoldReducers from './Hold';
import DubaiStockReducer from './DubaiStock';
import WorldwideStockReducers from './WorldwideStock';
import CartReducers from './Cart';
const rootReducer = combineReducers({
  customizer: customizer,
  navbar: navbar,
  auth: authReducer,
  technical: technicalReducers,
  admin: adminReducers,
  hold: HoldReducers,
  DubaiStock: DubaiStockReducer,
  WorldwideStock: WorldwideStockReducers,
  Cart: CartReducers
});

export default rootReducer;
