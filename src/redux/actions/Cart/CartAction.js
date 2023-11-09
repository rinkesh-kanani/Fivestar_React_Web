import { createAction } from '@reduxjs/toolkit';
import * as Actions from '../types';

/**
 * @desc Set Cart
 */
export const setCartList = createAction(Actions.SET_CART_LIST);

/**
 * @desc Clear Cart
 */
export const clearCart = () => (dispatch) => {
  dispatch(setCartList(null));
};
