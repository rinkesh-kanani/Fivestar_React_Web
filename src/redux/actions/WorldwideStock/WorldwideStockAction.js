import { createAction } from '@reduxjs/toolkit';
import * as Actions from '../types';

/**
 * @desc Set Dubai Stock
 */
export const setWorldwideStockList = createAction(Actions.SET_WORLD_WIDE_STOCK_LIST);

/**
 * @desc Clear Dubai Stock
 */
export const clearWorldwideStock = () => (dispatch) => {
  dispatch(setWorldwideStockList(null));
};
