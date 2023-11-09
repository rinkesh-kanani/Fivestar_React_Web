import { createAction } from '@reduxjs/toolkit';
import * as Actions from '../types';

/**
 * @desc Set Prime Details
 */
export const setPrimeDetails = createAction(Actions.SET_PRIME_DETAILS);

/**
 * @desc Set Prime Category List
 */
export const setPrimeCategoryList = createAction(Actions.SET_PRIME_CATEGORY_LIST);

/**
 * @desc Clear Prime Data
 */
export const clearPrimeData = () => (dispatch) => {
  dispatch(setPrimeDetails(null));
};
