import { createAction } from '@reduxjs/toolkit';
import * as Actions from '../types';

/**
 * @desc Set Email Templet
 */
export const setHoldList = createAction(Actions.SET_HOLD_LIST);

/**
 * @desc Clear Topic Data
 */
export const clearHold = () => (dispatch) => {
  dispatch(setHoldList(null));
};
