import { createAction } from '@reduxjs/toolkit';
import * as Actions from '../types';

/**
 * @desc Set ApprovalList
 */
export const setApprovalList = createAction(Actions.SET_APPROVAL_LIST);

/**
 * @desc Clear ApprovalList Data
 */
export const clearApprovalListData = () => (dispatch) => {
  dispatch(setApprovalList(null));
};
