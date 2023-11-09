import { combineReducers } from 'redux';
import CartReducer from './CartReducer';

const CartReducers = combineReducers({
  cart: CartReducer
});

export default CartReducers;
