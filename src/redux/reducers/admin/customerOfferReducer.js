import { combineReducers } from 'redux';
import { createReducer } from '../../../helpers/reduxHelpers';
import * as Actions from '../../actions/types';

const setCustomerOfferListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_CUSTOMER_OFFER_LIST
});

const customerOfferReducer = combineReducers({
  CustomerOfferList: setCustomerOfferListReducer
});

export default customerOfferReducer;
