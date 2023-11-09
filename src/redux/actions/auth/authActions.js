import { createAction } from '@reduxjs/toolkit';
import * as Actions from '../types';

/**
 * @desc Set Current User
 */
export const setCurrentUser = createAction(Actions.SET_CURRENT_USER);

/**
 * @desc Clear Current Data
 */
export const clearCurrentData = () => (dispatch) => {
  dispatch(setCurrentUser(null));
};
