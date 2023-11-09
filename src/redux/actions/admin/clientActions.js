import { createAction } from '@reduxjs/toolkit';
import * as Actions from '../types';

/**
 * @desc Set Order List
 */
export const setClientList = createAction(Actions.SET_CLIENT_LIST);

/**
 * @desc Clear Order Data
 */
export const clearClientData = () => (dispatch) => {
  dispatch(setClientList(null));
};
