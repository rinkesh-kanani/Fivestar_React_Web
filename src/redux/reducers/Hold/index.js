import { combineReducers } from 'redux';
import HoldReducer from './HoldReducer';

const HoldReducers = combineReducers({
  Hold: HoldReducer
});

export default HoldReducers;
