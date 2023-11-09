import { combineReducers } from 'redux';
import { createReducer } from '../../../helpers/reduxHelpers';
import * as Actions from '../../actions/types';

const setCartListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_CART_LIST
});

const CartReducer = combineReducers({
  CartList: setCartListReducer
});

export default CartReducer;
