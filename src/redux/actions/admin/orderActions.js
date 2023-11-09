import { createAction } from '@reduxjs/toolkit';
import * as Actions from '../types';

/**
 * @desc Set Order List
 */
export const setOrderList = createAction(Actions.SET_ORDER_LIST);

/**
 * @desc Update Order List Item
 */
export const updateOrderListItem = createAction(Actions.UPDATE_ORDER_LIST_ITEM);

/**
 * @desc Set Single Order
 */
export const setSingleOrder = createAction(Actions.SET_SINGLE_ORDER);
/**
 * @desc Set Auto Company
 */
export const setAutoCompany = createAction(Actions.SET_AUTO_COMPANY);

/**
 * @desc Clear Order Data
 */
export const clearOrderData = () => (dispatch) => {
  dispatch(setOrderList(null));
  dispatch(setSingleOrder(null));
  dispatch(setAutoCompany(null));
};
