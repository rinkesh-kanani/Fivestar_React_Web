import { createAction } from '@reduxjs/toolkit';
import * as Actions from '../types';

/**
 * @desc Set Customer Offer List
 */
export const setCustomerOfferList = createAction(Actions.SET_CUSTOMER_OFFER_LIST);

/**
 * @desc Clear Order Data
 */
export const clearCustomerOfferData = () => (dispatch) => {
  dispatch(setCustomerOfferList(null));
};
