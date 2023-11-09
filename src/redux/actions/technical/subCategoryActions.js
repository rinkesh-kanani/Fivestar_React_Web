import { createAction } from '@reduxjs/toolkit';
import * as Actions from '../types';

/**
 * @desc Set Sub Details
 */
export const setSubDetails = createAction(Actions.SET_SUB_DETAILS);

/**
 * @desc Set Sub Category List
 */
export const setSubCategoryList = createAction(Actions.SET_SUB_CATEGORY_LIST);

/**
 * @desc Clear Topic Data
 */
export const clearSubData = () => (dispatch) => {
  dispatch(setSubDetails(null));
};
