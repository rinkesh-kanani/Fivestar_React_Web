import { createAction } from '@reduxjs/toolkit';
import * as Actions from '../types';

/**
 * @desc Set Master Details
 */
export const setMasterDetails = createAction(Actions.SET_MASTER_DETAILS);

/**
 * @desc Set Master Category List
 */
export const setMasterCategoryList = createAction(Actions.SET_MASTER_CATEGORY_LIST);

/**
 * @desc Set All Master  List
 */
export const setAllMasterList = createAction(Actions.SET_ALL_MASTER_LIST);

/**
 * @desc Clear Master Data
 */
export const clearMasterData = () => (dispatch) => {
  dispatch(setMasterDetails(null));
  dispatch(setMasterCategoryList(null));
  dispatch(setAllMasterList(null));
};
