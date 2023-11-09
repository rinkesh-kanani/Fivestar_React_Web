import { createAction } from '@reduxjs/toolkit';
import * as Actions from '../types';

/**
 * @desc Set EmailAddress
 */
export const setEmailAddress = createAction(Actions.SET_EMAIL_ADDRESS);

/**
 * @desc Set Email Address List
 */
export const setEmailAddressList = createAction(Actions.SET_EMAIL_ADDRESS_LIST);

/**
 * @desc Clear EmailAddress
 */
export const clearEmailAddress = () => (dispatch) => {
  dispatch(setEmailAddress(null));
};
