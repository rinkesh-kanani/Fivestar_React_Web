import { createAction } from '@reduxjs/toolkit';
import * as Actions from '../types';

/**
 * @desc Set Email Templet
 */
export const setEmailTemplate = createAction(Actions.SET_EMAIL_TEMPLATE);

/**
 * @desc Set Edit Email Templet
 */
export const setEditEmailTemplate = createAction(Actions.SET_EDIT_EMAIL_TEMPLATE);

/**
 * @desc Clear Topic Data
 */
export const clearEmailTemplate = () => (dispatch) => {
  dispatch(setEmailTemplate(null));
};
