import { createAction } from '@reduxjs/toolkit';
import * as Actions from '../types';

/**
 * @desc Set Dubai Stock
 */
export const setDubaiStockList = createAction(Actions.SET_DUBAI_STOCK_LIST);
/**
 * @desc Set Membership List
 */
export const setMembershipList = createAction(Actions.SET_MEMBERSHIP_LIST);

/**
 * @desc Clear Dubai Stock
 */
export const clearDubaiStock = () => (dispatch) => {
  dispatch(setDubaiStockList(null));
  dispatch(setMembershipList(null));
};
