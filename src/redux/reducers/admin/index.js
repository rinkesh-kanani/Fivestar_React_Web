import { combineReducers } from 'redux';
import orderReducer from './orderReducer';
import clientReducer from './clientReducer';
import freelancerReducer from './freelancerReducer';
import customerOfferReducer from './customerOfferReducer';
import approvalListReducer from './approvalListReducer';
const adminReducers = combineReducers({
  order: orderReducer,
  client: clientReducer,
  Freelanchers: freelancerReducer,
  CustomerOffer: customerOfferReducer,
  approval: approvalListReducer
});

export default adminReducers;
