import { createAction } from '@reduxjs/toolkit';
import * as Actions from '../types';

/**
 * @desc Set Order List
 */
export const setFreelanchersList = createAction(Actions.SET_FREELANCHERS_LIST);

/**
 * @desc Clear Order Data
 */
export const clearFreelanchersData = () => (dispatch) => {
  dispatch(setFreelanchersList(null));
};
